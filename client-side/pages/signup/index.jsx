import Signup from "@/components/ui/forms/Signup";
import { SITE_TITLE } from "@/lib/constants";
import Head from "next/head";
import React from "react";

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>{SITE_TITLE}® - Signup</title>
      </Head>
      <Signup />
    </>
  );
};

export default SignupPage;
