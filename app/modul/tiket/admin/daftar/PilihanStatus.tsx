import type React from "react";
import Select from "~/komponen/Select";

export default function PilihanStatus(): React.JSX.Element {
  return (
    <Select>
      <option value={0}>All Status</option>
      <option>Open</option>
      <option>In Progress</option>
      <option>Done</option>
    </Select>
  );
}
