import LoginHeader from "./LoginHeader";
import RoleSelector from "./RoleSelector";
import LoginForm from "./LoginForm";
import SubmitButton from "./SubmitButton";
import type { SubmitEvent } from "react";
import AuthErrorNotification from "./AuthErrorNotification";
import type { PeranPengguna } from "~/dasar/PeranPengguna";
import CardOtentikasi from "../../CardOtentikasi";
import LinkOtentikasi from "../../LinkOtentikasi";

interface Props {
  peran: PeranPengguna;
  onSetPeran: (peran: PeranPengguna) => void;
  submitting: boolean;
  onSubmit: (data: LoginFormData) => void;
  authError: string | null;
  onClearAuthError: () => void;
}

export default function LoginCard({
  peran,
  onSetPeran,
  submitting,
  onSubmit,
  authError,
  onClearAuthError,
}: Props) {
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: LoginFormData = {
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };
    onSubmit(data);
  }

  return (
    <CardOtentikasi>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col items-center"
      >
        <LoginHeader />
        {authError && (
          <AuthErrorNotification
            message={authError}
            onClear={onClearAuthError}
          />
        )}
        <RoleSelector peran={peran} onSetPeran={onSetPeran} />
        <LoginForm />
        <SubmitButton disabled={submitting} />
        <LinkOtentikasi to="/forgot-password">
          Forgot your password?
        </LinkOtentikasi>
      </form>
    </CardOtentikasi>
  );
}
