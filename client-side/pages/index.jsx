// Import the action creators 'incremented' and 'decremented' from the 'counterSlice'.
import { decremented, incremented } from "@/src/store/features/counterSlice";

// Import the 'Head' component from 'next/head' to set document head metadata.
import Head from "next/head";

// Import 'useDispatch' and 'useSelector' hooks from 'react-redux' to interact with the Redux store.
import { useDispatch, useSelector } from "react-redux";

// Define your main application component.
export default function Home() {
  // Use 'useSelector' to select the 'counter' state from the Redux store.
  const { value } = useSelector((state) => state.counter);

  // Use 'useDispatch' to get access to the Redux store's 'dispatch' function.
  const dispatch = useDispatch();

  return (
    <>
      {/* Set document head metadata */}
      <Head>
        <title>Boilerplate</title>
      </Head>

      <main>
       <h1>USAMA</h1>
      </main>
    </>
  );
}
