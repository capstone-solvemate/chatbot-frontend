import { NAMA_SISTEM } from "~/dasar/kontanta";
import LogoBrand2 from "~/komponen/LogoBrand2";

export default function LoginHeader() {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-600 text-white">
        <LogoBrand2 className="w-9 h-9" />
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 mt-4">
        {NAMA_SISTEM}
      </h1>
      <p className="text-gray-500 mt-1">Sign in to your account</p>
    </div>
  );
}
