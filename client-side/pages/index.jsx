import Signin from "@/components/ui/forms/Signin";
import { SITE_TITLE } from "@/lib/constants";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>{SITE_TITLE} | Signin</title>
        <meta property="twitter:image" content="/icon.png" />
        <meta property="twitter:card" content="/icon.png" />
        <meta property="twitter:title" content={`${SITE_TITLE}®`} />
        <meta
          property="twitter:description"
          content="Elevate your thoughts, Inspire the world."
        />
        <meta
          property="description"
          content="Elevate your thoughts, Inspire the world."
        />
        <meta property="og:image" content="/icon.png" />{" "}
        <meta property="og:title" content={`${SITE_TITLE}®`} />
        <meta
          property="og:description"
          content="Elevate your thoughts, Inspire the world."
        />
        <meta
          property="og:url"
          content="https://deadpoetssociety.vercel.app/"
        />
      </Head>

      <Signin />
    </>
  );
}
