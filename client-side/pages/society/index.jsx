import dynamic from "next/dynamic";
import Poetries from "@/components/poetry/Poetries";
const Header = dynamic(() => import("@/components/header/Header"), {
  ssr: false,
});

const index = () => {
  return (
    <main>
      <Header />
      <Poetries />
     
    </main>
  );
};

export default index;
