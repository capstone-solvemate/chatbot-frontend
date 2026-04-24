import LoginHeader from "./LoginHeader";
import RoleSelector from "./RoleSelector";
import LoginForm from "./LoginForm";
import SubmitButton from "./SubmitButton";
import ForgotPasswordLink from "./ForgotPasswordLink";
import type { SubmitEvent } from "react";
import AuthErrorNotification from "./AuthErrorNotification";
import type { PeranPengguna } from "~/dasar/PeranPengguna";

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
    <form
      method="POST"
      className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center"
      onSubmit={handleSubmit}
    >
      <LoginHeader />
      {authError && (
        <AuthErrorNotification message={authError} onClear={onClearAuthError} />
      )}
      <RoleSelector peran={peran} onSetPeran={onSetPeran} />
      <LoginForm />
      <SubmitButton disabled={submitting} />
      <ForgotPasswordLink />
    </form>
  );
}
