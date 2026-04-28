import IkonEmail from "~/komponen/ikon/IkonEmail";
import InputFieldOtentikasi from "../InputFieldOtentikasi";
import IkonPassword from "~/komponen/ikon/IkonPassword";

export default function LoginForm() {
  return (
    <div className="w-full flex flex-col gap-4">
      <InputFieldOtentikasi
        name="email"
        label="Email Address"
        type="email"
        placeholder="you@company.com"
        icon={<IkonEmail />}
      />

      <InputFieldOtentikasi
        name="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        minLength={8}
        icon={<IkonPassword />}
      />
    </div>
  );
}
