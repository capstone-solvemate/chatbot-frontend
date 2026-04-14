import IkonJam from "~/komponen/IkonJam";
import { StatusTiket, statusTiketToString } from "./StatusTiket";
import IkonCheckCircle from "~/komponen/IkonCheckCircle";
import IkonExclamationCircle from "~/komponen/IkonExclamationCircle";

const statusStyle = {
  [StatusTiket.Open]: "bg-red-100 text-red-700 border-red-200",
  [StatusTiket.InProgress]: "bg-orange-100 text-orange-700 border-orange-200",
  [StatusTiket.Resolved]: "bg-green-100 text-green-700 border-green-200",
};

const statusIcon = {
  [StatusTiket.Open]: <IkonExclamationCircle className="h-5" />,
  [StatusTiket.InProgress]: <IkonJam className="h-5" />,
  [StatusTiket.Resolved]: <IkonCheckCircle className="h-5" />,
};

interface Props {
  status: StatusTiket;
  withIcon?: boolean;
  size?: "xs" | "sm";
}

export default function ChipStatusTiket({
  status,
  withIcon = false,
  size = "xs",
}: Props) {
  return (
    <span
      className={`${size === "xs" ? "text-xs" : "text-sm"} px-3 py-1 flex items-center gap-1.5 rounded-md sm:rounded-full border ${statusStyle[status]}`}
    >
      {withIcon && statusIcon[status]}
      {statusTiketToString(status)}
    </span>
  );
}
