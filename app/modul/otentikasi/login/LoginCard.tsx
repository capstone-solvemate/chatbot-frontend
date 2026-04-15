import LoginHeader from "./LoginHeader";
import RoleSelector from "./RoleSelector";
import LoginForm from "./LoginForm";
import SubmitButton from "./SubmitButton";
import ForgotPasswordLink from "./ForgotPasswordLink";
import type { Peran } from "../Peran";

interface Props {
  peran: Peran;
  onSetPeran: (peran: Peran) => void;
}

export default function LoginCard({ peran, onSetPeran }: Props) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
      <LoginHeader />
      <RoleSelector peran={peran} onSetPeran={onSetPeran} />
      <LoginForm />
      <SubmitButton />
      <ForgotPasswordLink />
    </div>
  );
}
