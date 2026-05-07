import { NAMA_SISTEM } from "~/dasar/kontanta";
import LogoBrand2 from "~/komponen/LogoBrand2";
import JudulOtentikasi from "../../JudulOtentikasi";
import SubJudulOtentikasi from "../../SubJudulOtentikasi";

export default function LoginHeader() {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-600 text-white">
        <LogoBrand2 className="w-9 h-9" />
      </div>

      <JudulOtentikasi>{NAMA_SISTEM}</JudulOtentikasi>
      <SubJudulOtentikasi>Sign in to your account</SubJudulOtentikasi>
    </div>
  );
}
