import { IkonNotifikasi } from "./IkonNotifikasi";

export default function TampilanNotifikasi() {
  return (
    <div className="relative cursor-pointer">
      <IkonNotifikasi className="h-4 w-4 stroke-gray-600" />

      <span className="absolute -right-3.5 -top-4 flex py-0.5 px-1.5 items-center justify-center rounded-lg bg-red-500 text-xs text-white">
        2
      </span>
    </div>
  )
}