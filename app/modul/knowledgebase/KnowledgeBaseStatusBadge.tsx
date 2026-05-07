import { KnowledgeBaseStatus } from "./KnowledgeBase";

interface Props {
  status: KnowledgeBaseStatus;
}

export default function KnowledgeBaseStatusBadge({ status }: Props) {
  const config: Record<
    KnowledgeBaseStatus,
    { label: string; className: string }
  > = {
    [KnowledgeBaseStatus.SelesaiDiproses]: {
      label: "Processed",
      className: "bg-green-100 text-green-700",
    },
    [KnowledgeBaseStatus.SedangDiproses]: {
      label: "Processing",
      className: "bg-yellow-100 text-yellow-700",
    },
    [KnowledgeBaseStatus.BelumDiproses]: {
      label: "Pending",
      className: "bg-gray-100 text-gray-600",
    },
  };

  const { label, className } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${className}`}
    >
      {status === KnowledgeBaseStatus.SedangDiproses && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
      )}
      {label}
    </span>
  );
}
