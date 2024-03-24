import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Protected = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (userInfo) {
      if (router.pathname === "/signup" || router.pathname === "/") {
        router.replace("/society");
      }
    } else {
      if (
        router.pathname === "/society" &&
        !userInfo &&
        router.pathname !== "/signup"
      ) {
        router.replace("/");
      }
    }
  }, [userInfo, router.pathname]);

  // You need to return JSX or null from the component
  return null;
};

export default Protected;
