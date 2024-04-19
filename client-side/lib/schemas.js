import * as Yup from "yup";

export const signinSchema = Yup.object({
  email: Yup.string()
    .email()
    .required("email is required to enter the society!"),
  password: Yup.string().required("password is required!"),
});

export const signupSchema = Yup.object({
  name: Yup.string().required("poet must contain a name!"),
  email: Yup.string()
    .email()
    .required("email is required to enter the society!"),
  password: Yup.string().required("password is required!"),
});
export const postSchema = Yup.object({
  description: Yup.string()
    .required("poetry is required!"),
});

