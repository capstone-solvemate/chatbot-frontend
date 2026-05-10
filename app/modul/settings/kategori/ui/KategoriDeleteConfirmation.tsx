import type { Kategori } from "../Kategori";
import { Button, ButtonColor } from "~/komponen/Button";

interface Props {
  kategori: Kategori;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function KategoriDeleteConfirmation({
  kategori,
  isDeleting,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-2">
          Delete Category
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">"{kategori.nama}"</span>
          ? This action cannot be undone.
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            color={ButtonColor.White}
            className="text-sm! px-4! py-2!"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            className="text-sm! px-4! py-2! bg-red-600! hover:bg-red-700! border-red-600! hover:border-red-700!"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
