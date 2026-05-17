import { NAMA_SISTEM } from "~/dasar/kontanta";
import LogoBrand from "./LogoBrand";

export default function TampilanBrand() {
  return (
    <div className="flex items-center gap-2 font-semibold text-lg">
      <img src="/brand.png" className="h-8" />
      {NAMA_SISTEM}
    </div>
  );
}
