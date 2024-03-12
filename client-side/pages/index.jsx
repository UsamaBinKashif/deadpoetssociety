import Signin from "@/components/ui/forms/Signin";
import { SITE_TITLE } from "@/lib/constants";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>{SITE_TITLE}®</title>
      </Head>

      <Signin />
    </>
  );
}
