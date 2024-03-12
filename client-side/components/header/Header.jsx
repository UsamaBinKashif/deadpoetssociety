/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <header class="bg-orange-100 p-5">
      <div class="container mx-auto flex   justify-between items-center">
        <img src="/icon.png" alt="main-icon" className="max-w-[50px]" />
        <div className="flex gap-x-4">
          <Button className="text-xs">Add</Button>
          <Button variant="outline" className="text-xs">Logout</Button>

          <Avatar title={userInfo.name}>
            <AvatarImage src={userInfo.profile_image} />
            <AvatarFallback>{userInfo.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
