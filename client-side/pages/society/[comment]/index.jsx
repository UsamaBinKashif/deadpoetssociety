/* eslint-disable @next/next/no-img-element */
import SkeletonLoader from "@/components/poetry/SkeletonLoader";
import { addComment, getSinglePost } from "@/lib/actions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

const CommentPage = () => {
  const router = useRouter();
  const { id } = useSelector((state) => state?.auth?.userInfo);

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch the post data
  const fetchPost = async () => {
    try {
      const data = await getSinglePost({
        postId: router?.query?.comment,
      });
      if (data) {
        setPost(data);
      } else {
        setError("Failed to fetch posts");
      }
    } catch (error) {
      setError("An error occurred while fetching posts");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true); // Set submitting state to true
        const data = await addComment({
          text: values.comment,
          commentedBy: id,
          postId: router?.query?.comment,
        });
        if (data) {
          resetForm(); // Reset the form after successful submission
          await fetchPost(); // Fetch the updated post data to refresh comments
        } else {
          console.error("Failed to add comment:", data.message);
          // Handle error or display message to the user
        }
      } catch (error) {
        console.error("Error adding comment:", error.message);
        // Handle error or display message to the user
      } finally {
        setSubmitting(false); // Reset submitting state
      }
    },
  });

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="flex flex-col items-center gap-4 justify-center relative bg-orange-100 min-h-screen">
      <div className="absolute left-5 top-5">
        <Link href={"/society"}>
          <Button>Go Back</Button>
        </Link>
      </div>
      <Card className="w-96 flex flex-col items-start">
        <CardContent className="py-10 text-center">
          <p>{post?.description}</p>
        </CardContent>
        <CardFooter>
          <CardDescription>
            <p className="text-[8px] md:text-xs">Posted by:</p>
            <div className="flex items-center justify-center gap-x-3">
              <img
                className="w-[40px] h-[40px] rounded-full object-cover p-[2px] border border-black"
                src={post?.postedBy?.profile_image}
                alt="profile"
              />
              <p className="text-[12px] md:text-base">{post?.postedBy?.name}</p>
            </div>
          </CardDescription>
        </CardFooter>
      </Card>
      <form
        onSubmit={formik.handleSubmit}
        className="flex items-center gap-x-4"
      >
        <Input
          id="comment"
          placeholder="Comment"
          name="comment"
          type="text"
          className="w-60"
          onChange={formik.handleChange}
          value={formik.values.comment}
        />
        <Button
          type="submit"
          className="h-[39px]"
          disabled={formik.isSubmitting}
        >
          Add Comment
        </Button>
      </form>
      <div>
        {post?.comment?.length === 0 ? (
          <p className="text-[8px] md:text-xs">No comments 🥱</p>
        ) : (
          <>
            {post.comment.map((comment) => (
              <Card className="w-96 flex flex-col m-2" key={comment?._id}>
                <CardContent className="p-2">
                  <p>{comment?.text}</p>
                  <div>
                    <div className="flex gap-x-5 items-center">
                      <img
                        className="w-[20px] h-[20px] rounded-full object-cover p-[2px] border border-black"
                        src={comment?.postedBy?.profile_image}
                        alt="profile"
                      />
                      <p className="text-[10px]">{comment?.postedBy?.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default CommentPage;
