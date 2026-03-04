export default function ChatItemView({ fromCustomer = true, children }: ChatItemViewProps) {
  return (
    <div className={"flex " + (fromCustomer ? "justify-end" : "justify-start")}>
      <div className={"w-3/4 rounded-lg p-2 " + (fromCustomer ? "bg-gray-100" : "bg-blue-100")}>
        {children}
      </div>
    </div>
  )
}

interface ChatItemViewProps {
  fromCustomer?: boolean
  children: any
}