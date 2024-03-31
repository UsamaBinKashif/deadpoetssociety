import { getallposts } from "@/lib/actions";
import { Suspense, useEffect, useState } from "react";
import SkeletonLoader from "./SkeletonLoader";
import Poetry from "./Poetry";
import { Button } from "../ui/button";

const Poetries = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const data = await getallposts();
      if (data.success == true) {
        setPosts(data.posts);
      }
    };
    getPosts();
  }, []);
  return (
    <section className="flex p-20 flex-wrap gap-4 relative">
      <div className="absolute top-4 right-14">
        <Button className="text-xs outline-none">Add Poetry</Button>
      </div>
      <Suspense fallback={<SkeletonLoader />}>
        {posts.map((post) => (
          <Poetry key={post?._id} poetry={post} />
        ))}
      </Suspense>
    </section>
  );
};

export default Poetries;
