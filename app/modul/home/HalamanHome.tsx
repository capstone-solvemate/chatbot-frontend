import Navbar from "~/komponen/Navbar";
import type { Route } from "./+types/HalamanHome";
import TampilanCariFaq from "./TampilanCariFaq";
import BagianPopularFaqs from "./BagianPopularFaqs";
import { BagianAiAssistant } from "./BagianAiAssistant";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Home" }];
}

export default function Home() {
  return (
    <>
      <Navbar />
      <TampilanCariFaq />
      <BagianPopularFaqs />
      <BagianAiAssistant />
    </>
  );
}
