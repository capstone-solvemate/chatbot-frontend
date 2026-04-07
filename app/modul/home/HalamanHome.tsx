import Navbar from "~/komponen/Navbar";
import type { Route } from "./+types/HalamanHome";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Home" },
  ];
}

export default function Home() {
  return (
    <>
      <Navbar />
    </>
  );
}
