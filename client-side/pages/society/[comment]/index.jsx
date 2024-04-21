import SkeletonLoader from "@/components/poetry/SkeletonLoader";
import { getSinglePost } from "@/lib/actions";
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

const CommentPage = () => {
  const router = useRouter();

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    fetchPost();
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // console.log(post);
  return (
    <section className="flex  flex-col items-center gap-4 justify-center  relative bg-orange-100 min-h-screen">
      <Card className=" w-96 flex flex-col items-start  relative     ">
        <CardContent className="py-10 text-center">
          <p>{post?.description}</p>
        </CardContent>
        <CardFooter>
          <CardDescription className="">
            <p className="text-[8px] md:text-xs  ">Posted by:</p>
            <div className="flex items-center justify-center gap-x-3">
              <img
                className="w-[40px]  h-[40px] rounded-full object-cover p-[2px]"
                src={post?.postedBy?.profile_image}
                alt="profile"
              />
              <p className="text-[12px] md:text-base   ">
                {post?.postedBy?.name}
              </p>
            </div>
          </CardDescription>
        </CardFooter>
      </Card>
      <div className="flex items-center gap-x-4">
        <Input id="text" placeholder="Comment" name="text" type="text"  />
        <Button  type="button" className="h-[39px] ">
          Add Comment
        </Button>
      </div>
      <div></div>
    </section>
  );
};

export default CommentPage;
