export default function TicketItemView({ children, onClick, selected = false }: TicketItemViewProps) {
  return (
    <button onClick={onClick} className={"text-left cursor-pointer p-2 rounded " + (selected && "bg-gray-500 text-white")}>
      {children}
    </button>
  )
}

interface TicketItemViewProps {
  children: string
  onClick?: () => void
  selected?: boolean
}