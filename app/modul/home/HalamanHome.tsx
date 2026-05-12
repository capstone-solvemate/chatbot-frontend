import type { Route } from "./+types/HalamanHome";
import TampilanCariFaq from "./TampilanCariFaq";
import BagianPopularFaqs from "./BagianPopularFaqs";
import { BagianAiAssistant } from "./BagianAiAssistant";
import BagianSupport from "./BagianSupport";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import type { OutletContext } from "~/dasar/OutletContext";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Home" }];
}

type RingkasanTiket = {
  loading: boolean;
  open: number;
  inProgress: number;
  done: number;
};

export default function Home() {
  const { konektorBackend } = useOutletContext<OutletContext>();
  const [ringkasan, setRingkasan] = useState<RingkasanTiket>({
    loading: true,
    open: 0,
    inProgress: 0,
    done: 0,
  });

  useEffect(() => {
    konektorBackend
      .get("/api/tiket/ringkasan-status")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setRingkasan({
            ...json.data,
            loading: false,
          });
        }
      })
      .catch(() => {
        // Gagal fetch tidak kritis — card tetap tampil dengan nilai 0
      });
  }, []);

  return (
    <main className="min-h-default bg-gray-50">
      <TampilanCariFaq />
      <BagianPopularFaqs />
      <BagianAiAssistant />
      <BagianSupport
        open={ringkasan.open}
        inProgress={ringkasan.inProgress}
        resolved={ringkasan.done}
        loading={ringkasan.loading}
      />
    </main>
  );
}
