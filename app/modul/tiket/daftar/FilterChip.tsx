type Props = {
  children: React.ReactNode;
  active?: boolean;
};

export default function FilterChip({ children, active }: Props) {
  return (
    <button
      className={`px-4 py-2 cursor-pointer rounded-full text-sm transition
        ${
          active
            ? "bg-blue-600 text-white shadow"
            : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
        }`}
    >
      {children}
    </button>
  );
}
