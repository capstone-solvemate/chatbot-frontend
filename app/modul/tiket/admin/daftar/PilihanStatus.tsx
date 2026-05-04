import type React from "react";
import Select from "~/komponen/Select";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function PilihanStatus({
  value,
  onChange,
}: Props): React.JSX.Element {
  return (
    <Select value={value} onChange={(e) => onChange(Number(e.target.value))}>
      <option value={0}>All Status</option>
      <option value={1}>Open</option>
      <option value={2}>In Progress</option>
      <option value={3}>Done</option>
    </Select>
  );
}
