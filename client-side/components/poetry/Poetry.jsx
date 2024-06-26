/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { deletePost } from "@/lib/actions";
import { addPosts } from "@/src/store/features/authSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
const Poetry = ({ poetry }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDeletePost = async (id) => {
    try {
      const response = await deletePost({ postId: id });
      console.log("response:", response);
      dispatch(addPosts());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className=" w-96 relative  ">
      <CardContent className="py-10 text-center">
        <p>{poetry?.description}</p>
      </CardContent>
      <CardFooter>
        <div
          className="relative w-full  cursor-pointer hover:scale-105 transition-all"
          title="comments"
        >
          <div>
            {poetry?.comment?.length === 0 && (
              <Link
                href={`/society/${poetry._id}`}
                className="text-[8px] md:text-xs"
              >
                No comments 🥱
              </Link>
            )}
            {poetry?.comment[0] && (
              <Link href={`/society/${poetry._id}`}>
                <img
                  className="w-[25px]  h-[25px] rounded-full object-cover absolute left-[15px] top-[-10px] p-[2px]"
                  src={poetry?.comment[0]?.postedBy?.profile_image}
                  alt="profile"
                />
              </Link>
            )}

            {poetry?.comment[1] && (
              <Link href={`/society/${poetry._id}`}>
                <img
                  className="w-[25px]  h-[25px] rounded-full object-cover absolute left-[25px] bottom-0 p-[2px]"
                  src={poetry?.comment[1]?.postedBy?.profile_image}
                  alt="profile"
                />
              </Link>
            )}

            {poetry?.comment[2] && (
              <Link href={`/society/${poetry._id}`}>
                <img
                  className="w-[25px]  h-[25px] rounded-full object-cover absolute left-[4px] bottom-0 p-[2px]"
                  src={poetry?.comment[2]?.postedBy?.profile_image}
                  alt="profile"
                />
              </Link>
            )}
          </div>
        </div>
        <CardDescription className="w-32 text-end">
          <p className="text-[8px] md:text-xs  ">Posted by:</p>
          <p className="text-[8px] md:text-xs   ">{poetry?.postedBy?.name}</p>
          {userInfo?.id === poetry?.postedBy?.user && (
            <img
              src="/assets/trash-icon.png"
              alt="trash-icon"
              className="ml-auto my-2 w-[15px] h-[15px] cursor-pointer hover:scale-110"
              title="delete this post"
              onClick={() => handleDeletePost(poetry._id)}
            />
          )}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default Poetry;
