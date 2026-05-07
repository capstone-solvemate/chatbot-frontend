import { KnowledgeBase } from "./KnowledgeBase";

interface Props {
  dokumen: KnowledgeBase;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function KnowledgeBaseDeleteConfirmation({
  dokumen,
  isDeleting,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-1">
          Delete Document
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-700">
            {dokumen.namaBerkas}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
