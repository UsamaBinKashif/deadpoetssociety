import axios from "axios";
import { API_BASE } from "./constants";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

const signinuser = async (values) => {
  try {
    const { data } = await axios.post(`${API_BASE}/api/user/signin`, values);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const signupuser = async (values) => {
  try {
    const { data } = await axios.post(`${API_BASE}/api/user/signup`, values);
    return data;
  } catch (error) {
    toast({
      variant: "destructive",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
      description: error?.response?.data?.message,
    });
  }
};

export { signinuser, signupuser };
