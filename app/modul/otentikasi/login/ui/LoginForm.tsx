import IkonEmail from "~/komponen/ikon/IkonEmail";
import InputFieldOtentikasi from "../../InputFieldOtentikasi";
import IkonPassword from "~/komponen/ikon/IkonPassword";

type Props = {
  fieldErrors: any;
};

export default function LoginForm({ fieldErrors }: Props) {
  return (
    <div className="w-full flex flex-col gap-4">
      <InputFieldOtentikasi
        name="email"
        label="Email Address"
        type="email"
        placeholder="you@company.com"
        icon={<IkonEmail />}
        error={fieldErrors.email}
      />

      <InputFieldOtentikasi
        name="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        minLength={8}
        icon={<IkonPassword />}
        error={fieldErrors.password}
      />
    </div>
  );
}
