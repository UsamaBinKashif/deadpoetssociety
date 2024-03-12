/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_BASE } from "@/lib/constants";
import { setCredentials } from "@/src/store/features/authSlice";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const Signin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

 

  const signinuser = async () => {
    try {
      const { data } = await axios.post(
        `${API_BASE}/api/user/signin`,
        formik.values
      );
      if (data.message == "Signed in") {
        dispatch(setCredentials(data.user));
        // router.replace("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signinSchema = Yup.object({
    email: Yup.string().email().required("Enter a valid email"),
    password: Yup.string().required("Enter a valid password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit: () => {
      signinuser();
      console.log(formik.values);
    },
    onChange: (values) => {
      console.log("Form values changed:", values);
    },
  });

  return (
    <section>
      <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 overflow-hidden md:px-8 justify-center md:justify-normal flex items-center">
        <div className="flex-1 hidden md:block">
          {/* Replace with your image */}
          <img
            src="/assets/signin-poster.svg"
            className="max-w-lg"
            alt="banner for signin page"
          />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex-none space-y-5 max-w-xl"
        >
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Enter the dead poets society.</CardTitle>
              <CardDescription>
                sign in with your existing account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <div className="grid w-full items-center gap-4 tracking-[1.5px]">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      {...formik.getFieldProps("email")}
                      onChange={formik.handleChange}
                      required
                      placeholder="deadpoet@society.com"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="passowrd">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      {...formik.getFieldProps("password")}
                      onChange={formik.handleChange}
                      required
                      placeholder="do not worry, we keep secrets."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Link href="/signup">Do not have an account?</Link>
              </Button>
              <Button type="submit">Signin</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </section>
  );
};

export default Signin;
