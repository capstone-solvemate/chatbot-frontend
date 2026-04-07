import type React from "react"

interface Props {
  children: React.ReactNode
  active?: boolean
}

export default function NavItem({ children, active }: Props) {
  return (
    <button
      className={`rounded-md cursor-pointer px-3 py-2 text-sm font-medium transition
      ${active
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-100"
        }`}
    >
      {children}
    </button>
  )
}