import { NAMA_SISTEM } from "~/dasar/kontanta";
import LogoBrand from "./LogoBrand";

export default function TampilanBrand() {
  return (
    <div className="flex items-center gap-2 font-semibold text-lg">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
        <LogoBrand />
      </div>
      {NAMA_SISTEM}
    </div>
  );
}
