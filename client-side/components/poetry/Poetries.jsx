import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { getallposts } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import AddPoetry from "./AddPoetry";
import Poetry from "./Poetry";
import SkeletonLoader from "./SkeletonLoader";
import { useSelector } from "react-redux";

const Poetries = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const allPosts = useSelector((state) => state.auth.posts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getallposts();
        if (data.success) {
          setPosts(data.posts);
        } else {
          setError("Failed to fetch posts");
        }
      } catch (error) {
        setError("An error occurred while fetching posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [allPosts]);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="flex p-20 flex-wrap gap-4 relative">
      <Drawer>
        <DrawerTrigger>
          <div className="absolute top-4 right-14">
            <Button className="text-xs outline-none">Add Poetry</Button>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <AddPoetry />
        </DrawerContent>
      </Drawer>
      {posts.length === 0 ? (
        <div>No posts available</div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {posts.map((post) => (
            <Poetry key={post?._id} poetry={post} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Poetries;
