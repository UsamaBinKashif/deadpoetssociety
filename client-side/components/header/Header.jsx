/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signoutuser } from "@/lib/actions";
import { logout } from "@/src/store/features/authSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignout = async () => {
    try {
      const data = await signoutuser();
      if (data.success) {
        Cookies.remove("jwt");
        dispatch(logout());
        router.replace("/");
      }
    } catch (error) {}
  };
  return (
    <header className="bg-orange-100 p-5">
      <div className="container mx-auto flex justify-between items-center">
        <img src="/icon.png" alt="main-icon" className="max-w-[50px]" />

        <Popover>
          <PopoverTrigger asChild className="cursor-pointer">
            <Avatar title={userInfo?.name}>
              <AvatarImage src={userInfo?.profile_image} />
              <AvatarFallback>{userInfo?.name?.slice(0, 1)}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-60 mr-20">
            <div className="flex flex-col items-center gap-y-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">{userInfo?.name}</h4>
              </div>
              <div className="flex gap-x-4">
                <Button className="text-xs outline-none">View Profile</Button>

                <Button
                  variant="outline"
                  className="text-xs"
                  onClick={handleSignout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
