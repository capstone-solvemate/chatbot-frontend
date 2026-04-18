import IkonEmail from "~/komponen/ikon/IkonEmail";
import InputField from "./InputField";
import IkonPassword from "~/komponen/ikon/IkonPassword";

export default function LoginForm() {
  return (
    <div className="w-full flex flex-col gap-4">
      <InputField
        name="email"
        label="Email Address"
        type="email"
        placeholder="you@company.com"
        icon={<IkonEmail />}
      />

      <InputField
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
