// Import the action creators 'incremented' and 'decremented' from the 'counterSlice'.
import { decremented, incremented } from "@/src/store/features/counterSlice";
import Signin from "@/src/utils/forms/Signin";

// Import the 'Head' component from 'next/head' to set document head metadata.
import Head from "next/head";


export default function Home() {
  return (
    <>
      {/* Set document head metadata */}
      <Head>
        <title>DEAD POETS SOCIETY | LOGIN</title>
      </Head>

      <Signin />
    </>
  );
}
