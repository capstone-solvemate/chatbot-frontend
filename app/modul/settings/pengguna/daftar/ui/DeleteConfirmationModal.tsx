import {} from "~/dasar/PeranPengguna";
import type { Pengguna } from "../../data/Pengguna";

export default function DeleteConfirmationModal({
  pengguna,
  isDeleting,
  onConfirm,
  onCancel,
}: {
  pengguna: Pengguna;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-1">
          Delete User
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-700">{pengguna.nama}</span>?
          This action cannot be undone.
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 rounded-lg text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 rounded-lg text-sm text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
