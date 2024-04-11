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
import { signinuser } from "@/lib/actions";
import { signinSchema } from "@/lib/schemas";
import { setCredentials } from "@/src/store/features/authSlice";
import clsx from "clsx";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "../spinner";
import { ToastAction } from "@radix-ui/react-toast";
import { useToast } from "../use-toast";
import Cookies from "js-cookie";

const Signin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit: async () => {
      try {
        setLoading(true);
        const data = await signinuser(formik.values);
        if (data.success == true) {
          dispatch(setCredentials(data.user));
          Cookies.set("jwt", data.token);
          router.replace("/society");
        } else {
          toast({
            variant: "destructive",
            title: data.message,
            action: <ToastAction altText="try again">Try Again</ToastAction>,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: error.message,
          action: <ToastAction altText="try again">Try Again</ToastAction>,
        });
      } finally {
        setLoading(false);
      }
    },
  });
  const { errors, touched } = formik; // Destructure errors and touched from formik

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
                <div className="grid w-full items-center gap-5 tracking-[1.5px]">
                  <div className="flex flex-col space-y-1.5 relative">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      {...formik.getFieldProps("email")}
                      onChange={formik.handleChange}
                      placeholder="deadpoet@society.com"
                      className={clsx(
                        touched.email && errors.email && "border-red-500" // Add border-red-500 class if email field is touched and there's an error
                      )}
                    />
                    {errors.email && touched.email ? (
                      <p className="text-[10px] absolute -bottom-4 text-red-500">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-col space-y-1.5 relative">
                    <Label htmlFor="passowrd">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      {...formik.getFieldProps("password")}
                      onChange={formik.handleChange}
                      placeholder="do not worry, we keep secrets."
                      className={clsx(
                        touched.password && errors.password && "border-red-500" // Add border-red-500 class if email field is touched and there's an error
                      )}
                    />
                    {errors.password && touched.password ? (
                      <p className="text-[10px] absolute -bottom-4 text-red-500">
                        {errors.password}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-y-4 flex-col-reverse items-start">
              <Button variant="outline" type="button">
                <Link href="/signup">Do not have an account?</Link>
              </Button>

              <Button type="submit" disabled={loading}>
                {loading && <Spinner />}
                Signin
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </section>
  );
};

export default Signin;
