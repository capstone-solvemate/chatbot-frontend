interface Props {
  children?: React.ReactNode;
}

export default function ChatSidebarItem({
  children,
}: Props): React.JSX.Element {
  return (
    <button className="cursor-pointer text-gray-600">
      {children && children}
    </button>
  );
}
