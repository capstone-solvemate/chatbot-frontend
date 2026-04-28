import type React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function CardListAdmin({ children }: Props): React.JSX.Element {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {children && children}
    </div>
  );
}
