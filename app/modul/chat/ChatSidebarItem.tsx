interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export default function ChatSidebarItem({
  children,
  onClick,
  icon,
}: Props): React.JSX.Element {
  return (
    <button
      className={`cursor-pointer text-gray-600 px-4 py-3 flex gap-2 text-sm items-center`}
      onClick={onClick}
    >
      {icon && icon}
      {children && children}
    </button>
  );
}
