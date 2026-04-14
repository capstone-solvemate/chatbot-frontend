import type React from "react";

interface Props {
  children?: React.ReactNode;
}

export default function HelpCardItem({ children }: Props): React.JSX.Element {
  return (
    <div className="rounded-md p-4 bg-gray-100 text-gray-600 flex items-center justify-center text-center">
      <span>{children && children}</span>
    </div>
  );
}
