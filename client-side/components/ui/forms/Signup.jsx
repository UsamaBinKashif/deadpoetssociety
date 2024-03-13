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
import { signupuser } from "@/lib/actions";
import { signupSchema } from "@/lib/schemas";
import { ToastAction } from "@radix-ui/react-toast";
import clsx from "clsx";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useToast } from "../use-toast";

const Signup = () => {
  const router = useRouter();
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: async () => {
      const data = await signupuser(formik.values);
      if (data.message == "Signed up successfully!") {
        router.replace("/");
      }
    },
  });
  const { errors, touched } = formik;
  return (
    <section>
      <div className="max-w-screen-xl mx-auto px-4 py-24 gap-12 text-gray-600 overflow-hidden md:px-8 justify-center md:justify-normal flex items-center">
        <div className="flex-1 hidden md:block">
          <img src="/assets/signup-poster.svg" className="max-w-lg" />
        </div>
        <form
          className="flex-none space-y-5 max-w-xl"
          onSubmit={formik.handleSubmit}
        >
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Elevate your thoughts, Inspire the world.</CardTitle>
              <CardDescription>sign up with your new account.</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <div className="grid w-full items-center gap-5 tracking-[1.5px]">
                  <div className="flex flex-col space-y-1.5 relative">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="a dead poet"
                      name="name"
                      type="name"
                      {...formik.getFieldProps("name")}
                      onChange={formik.handleChange}
                      className={clsx(
                        touched.name && errors.name && "border-red-500" // Add border-red-500 class if email field is touched and there's an error
                      )}
                    />
                    {errors.name && touched.name ? (
                      <p className="text-[10px] absolute -bottom-4 text-red-500">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-col space-y-1.5 relative">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      placeholder="deadpoet@society.com"
                      name="email"
                      type="email"
                      {...formik.getFieldProps("email")}
                      onChange={formik.handleChange}
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
                      placeholder="do not worry, we keep secrets."
                      {...formik.getFieldProps("password")}
                      onChange={formik.handleChange}
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
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Link href="/">Already have an account?</Link>
              </Button>
              <Button type="submit">Signup</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </section>
  );
};

export default Signup;
