import type React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function TableHeaderAdmin({
  children,
}: Props): React.JSX.Element {
  return <thead className="bg-gray-50 text-gray-600">{children}</thead>;
}
