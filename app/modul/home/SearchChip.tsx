import { type ReactNode } from "react"

interface Props {
  children: ReactNode
}

export default function SearchChip({ children }: Props) {
  return (
    <button
      className="
        rounded-full
        border
        border-gray-200
        bg-white
        px-3
        py-1.5
        text-sm
        text-gray-700
        transition
        hover:bg-gray-50
      "
    >
      {children}
    </button>
  )
}