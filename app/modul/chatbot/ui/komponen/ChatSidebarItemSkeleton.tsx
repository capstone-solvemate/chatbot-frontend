export default function ChatSidebarItemSkeleton(): React.JSX.Element {
  return (
    <button
      className={`w-full px-4 py-3 flex gap-2 text-sm items-center text-left transition-colors`}
    >
      <div className="h-6 w-3/4 bg-gray-200 rounded-lg animate-pulse"></div>
    </button>
  );
}
