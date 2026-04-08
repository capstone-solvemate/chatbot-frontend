import type { ReactNode } from "react"
import { IkonItemFaq } from "~/komponen/IkonItemFaq"
import { IkonPanahKanan } from "~/komponen/IkonPanahKanan"

interface Props {
  title: string
  description: string
  icon?: ReactNode
}

export default function FAQCard({ title, description, icon }: Props) {
  return (
    <button
      className="
        cursor-pointer
        group
        flex
        flex-col
        w-full
        gap-4
        rounded-xl
        border
        border-gray-200
        bg-white
        p-5
        text-left
        transition
        hover:shadow-md
      "
    >
      <div className="flex justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
          {icon ? icon : <IkonItemFaq className="text-blue-600" />}
        </div>
        <IkonPanahKanan className="h-4 w-4 text-gray-400 transition group-hover:translate-x-1" />
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-gray-900">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-600">
          {description}
        </p>
      </div>
    </button>
  )
}