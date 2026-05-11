import { StatusKnowledgeBase } from "../data/StatusKnowledgeBase";

interface Props {
  status: StatusKnowledgeBase;
}

export default function StatusKnowledgeBaseBadge({ status }: Props) {
  const config: Record<
    StatusKnowledgeBase,
    { label: string; className: string }
  > = {
    [StatusKnowledgeBase.SelesaiDiproses]: {
      label: "Processed",
      className: "bg-green-100 text-green-700",
    },
    [StatusKnowledgeBase.SedangDiproses]: {
      label: "Processing",
      className: "bg-yellow-100 text-yellow-700",
    },
    [StatusKnowledgeBase.BelumDiproses]: {
      label: "Pending",
      className: "bg-gray-100 text-gray-600",
    },
    [StatusKnowledgeBase.GagalDiproses]: {
      label: "Failed",
      className: "bg-red-100 text-red-600",
    },
  };

  const { label, className } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${className}`}
    >
      {status === StatusKnowledgeBase.SedangDiproses && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
      )}
      {label}
    </span>
  );
}
