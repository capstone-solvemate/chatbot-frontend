interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  active?: boolean;
}

export default function ChatSidebarItem({
  children,
  onClick,
  icon,
  active,
}: Props): React.JSX.Element {
  return (
    <button
      className={`w-full cursor-pointer px-4 py-3 flex gap-2 text-sm items-center text-left transition-colors ${
        active
          ? "bg-blue-50 text-blue-700 font-medium"
          : "text-gray-600 hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children && <span className="truncate">{children}</span>}
    </button>
  );
}
