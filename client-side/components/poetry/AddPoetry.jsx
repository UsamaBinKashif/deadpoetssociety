import React from "react";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

const AddPoetry = () => {
  return (
    <div>
      <DrawerHeader>
        <DrawerTitle>Add New Poetry</DrawerTitle>
        <DrawerDescription>Type the poerty you want to post.</DrawerDescription>
      </DrawerHeader>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col space-y-1.5 relative">
          <Label htmlFor="description">Poetry</Label>
          <textarea id="description" placeholder="Elevate your thoughts, Inspire the world." name="description" type="text"  className="flex h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background  placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50"/>
        </div>
      </div>
      <DrawerFooter>
        <div className="flex justify-center gap-x-4">
          <Button className="w-[80px] ">Add</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </div>
      </DrawerFooter>
    </div>
  );
};

export default AddPoetry;
