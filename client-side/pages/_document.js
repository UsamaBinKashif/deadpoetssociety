import { SITE_TITLE } from "@/lib/constants";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{SITE_TITLE}</title>
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
        <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
