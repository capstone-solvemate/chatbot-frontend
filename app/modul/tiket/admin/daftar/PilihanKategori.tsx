import type React from "react";
import Select from "~/komponen/Select";

export default function PilihanKategori(): React.JSX.Element {
  return (
    <Select>
      <option value={0}>All Categories</option>
    </Select>
  );
}
