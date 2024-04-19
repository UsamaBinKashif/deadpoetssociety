/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Poetry = ({ poetry }) => {
  // console.log(poetry)
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
            {poetry?.comment?.length === 0 && <h1 className="text-[8px] md:text-xs">No comments 🥱</h1>}
            {poetry?.comment[0] && (
              <img
                className="w-[25px]  h-[25px] rounded-full object-cover absolute left-[15px] top-[-10px] p-[2px]"
                src={poetry?.comment[0]?.postedBy?.profile_image}
                alt="profile"
              />
            )}

            {poetry?.comment[1] && (
              <img
                className="w-[25px]  h-[25px] rounded-full object-cover absolute left-[25px] bottom-0 p-[2px]"
                src={poetry?.comment[1]?.postedBy?.profile_image}
                alt="profile"
              />
            )}

            {poetry?.comment[2] && (
              <img
                className="w-[25px]  h-[25px] rounded-full object-cover absolute left-[4px] bottom-0 p-[2px]"
                src={poetry?.comment[2]?.postedBy?.profile_image}
                alt="profile"
              />
            )}
          </div>
        </div>
        <CardDescription className="w-32 text-end">
          <p className="text-[8px] md:text-xs  ">Posted by:</p>
          <p className="text-[8px] md:text-xs   ">{poetry?.postedBy?.name}</p>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default Poetry;
