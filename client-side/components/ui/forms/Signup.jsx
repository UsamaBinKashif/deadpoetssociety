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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const Signup = () => {
  return (
    <section>
      <div className="max-w-screen-xl mx-auto px-4 py-24 gap-12 text-gray-600 overflow-hidden md:px-8 justify-center md:justify-normal flex items-center">
        <div className="flex-1 hidden md:block">
          <img src="/assets/signup-poster.svg" className="max-w-lg" />
        </div>
        <div className="flex-none space-y-5 max-w-xl">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Elevate your thoughts, Inspire the world.</CardTitle>
              <CardDescription>
                sign up with your new account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4 tracking-[1.5px]">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="a dead poet" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="deadpoet@society.com" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="passowrd">Password</Label>
                    <Input
                      id="password"
                      placeholder="do not worry, we keep secrets."
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
            <Button variant="outline">
                <Link href="/">Already have an account?</Link>
              </Button>
              <Button>Signup</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Signup;
