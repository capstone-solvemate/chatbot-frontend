interface Props {
  kategori: string;
  size?: "base" | "sm";
}

export default function ChipKategori({ kategori, size = "base" }: Props) {
  return (
    <span
      className={`px-3 py-1 bg-blue-50 text-blue-700 rounded-md sm:rounded-full ${size === "sm" ? "text-sm" : "text-base"}`}
    >
      {kategori}
    </span>
  );
}
