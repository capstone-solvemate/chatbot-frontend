import { Environment } from "./types/Environment";

type Props = {
  environment: Environment;
};

export default function DevModeNotification({
  environment,
}: Props): React.JSX.Element {
  return (
    <div
      className={`fixed z-50 left-0 top-0 w-full h-7 flex items-center justify-center text-white text-lg print:hidden ${environment === Environment.Mock ? "bg-purple-600" : "bg-red-600"}`}
    >
      {environment === Environment.Mock ? "Mock" : "Development"} Mode
    </div>
  );
}
