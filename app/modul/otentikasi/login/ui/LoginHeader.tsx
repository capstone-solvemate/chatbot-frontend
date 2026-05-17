import { NAMA_SISTEM } from "~/dasar/kontanta";
import JudulOtentikasi from "../../JudulOtentikasi";
import SubJudulOtentikasi from "../../SubJudulOtentikasi";

export default function LoginHeader() {
  return (
    <div className="flex flex-col items-center mb-6">
      <img className="w-16" src="/brand.png" />

      <JudulOtentikasi>{NAMA_SISTEM}</JudulOtentikasi>
      <SubJudulOtentikasi>Sign in to your account</SubJudulOtentikasi>
    </div>
  );
}
