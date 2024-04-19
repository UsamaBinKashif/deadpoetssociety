import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { ToastAction } from "@radix-ui/react-toast";
// import { addPost } from "@/lib/actions";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { postSchema } from "@/lib/schemas";
import clsx from "clsx";
import { addPosts } from "@/src/store/features/authSlice";
import { addPost } from "@/lib/actions";

const AddPoetry = () => {
  const { id } = useSelector((state) => state?.auth?.userInfo);
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null); // Ref for the "Cancel" button

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: postSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true); // Set submitting state to true
        const data = await addPost({
          description: values.description,
          postedBy: id,
        });
        if (data) {
          dispatch(addPosts());
          cancelButtonRef.current.click();
        } else {
          console.error("Failed to add post:", data.message);
          // Handle error or display message to the user
        }
      } catch (error) {
        console.error("Error adding post:", error.message);
        // Handle error or display message to the user
      } finally {
        setSubmitting(false); // Reset submitting state
      }
    },
  });

  const { errors, touched } = formik;
  return (
    <div>
      <DrawerHeader>
        <DrawerTitle>Add New Poetry</DrawerTitle>
        <DrawerDescription>Type the poerty you want to post.</DrawerDescription>
      </DrawerHeader>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col space-y-1.5 relative">
          <Label htmlFor="description">Poetry</Label>
          <textarea
            {...formik.getFieldProps("description")}
            onChange={formik.handleChange}
            id="description"
            placeholder={clsx(
              touched.description && errors.description
                ? errors.description
                : "Elevate your thoughts, Inspire the world."
            )}
            name="description"
            type="text"
            required
            className={clsx(
              "flex h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background  placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50",
              touched.description && errors.description && "border-red-500" // Add border-red-500 class if email field is touched and there's an error
            )}
          />
        </div>
      </div>
      <DrawerFooter>
        <div className="flex justify-center gap-x-4">
          <Button className="w-[80px]" onClick={formik.handleSubmit}>
            Add
          </Button>
          <DrawerClose>
            <Button variant="outline" ref={cancelButtonRef}>
              Cancel
            </Button>
          </DrawerClose>
        </div>
      </DrawerFooter>
    </div>
  );
};

export default AddPoetry;
