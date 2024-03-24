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
  return (
    <Card className="w-96 relative  ">
      <CardContent className="py-10 text-center">
        <p>
          Poetry, also called verse, is a form of literature that uses aesthetic
          and often rhythmic qualities of language − such as phonaesthetics,
          sound symbolism, and metre − to evoke meanings in addition to, or in
          place of, a prosaic ostensible meaning.
        </p>
      </CardContent>
      <CardFooter>
        <div
          className="relative w-full  cursor-pointer hover:scale-105 transition-all"
          title="comments"
        >
          <div>
            {poetry?.comment?.length === 0 && (
              <h1 className="text-center">🥱</h1>
            )}
            {poetry?.comment[0] && (
              <img
                className="w-[30px]  h-[32px] rounded-full object-cover absolute left-[15px] top-[-10px] p-[2px]"
                src={
                  "https://images.unsplash.com/photo-1628503347754-8131840040a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDl8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D"
                }
                alt="profile"
              />
            )}

            {poetry?.comment[1] && (
              <img
                className="w-[30px]  h-[32px] rounded-full object-cover absolute left-[30px] bottom-0 p-[2px]"
                src={
                  "https://images.unsplash.com/photo-1656432606161-41c3071950ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                }
                alt="profile"
              />
            )}

            {poetry?.comment[2] && (
              <img
                className="w-[30px]  h-[32px] rounded-full object-cover absolute left-[4px] bottom-0 p-[2px]"
                src={
                  "https://images.unsplash.com/photo-1602562887763-851fa56061e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                }
                alt="profile"
              />
            )}
          </div>
        </div>
        <CardDescription className="w-32">
          <p className="text-xs  ">
            Posted by: 
          </p>
          <p className="text-xs  ">
          User Name 
          </p>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default Poetry;
