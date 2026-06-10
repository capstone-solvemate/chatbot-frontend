import type React from "react";
import { Button, ButtonColor } from "~/komponen/Button";
import IkonExclamationTriangle from "~/komponen/ikon/IkonExclamationTriangle";
import IkonHapus from "~/komponen/ikon/IkonHapus";
import IkonTutup from "~/komponen/ikon/IkonTutup";
import type { Faq } from "../../Faq";

interface Props {
  faq: Faq;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function FaqDeleteConfirmation({
  faq,
  isDeleting,
  onConfirm,
  onCancel,
}: Props): React.JSX.Element {
  return (
    <div className="bg-black/60 z-50 backdrop-blur-md fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md flex flex-col gap-4">
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2 items-center">
            <div className="text-red-600 bg-red-50 w-8 h-8 rounded-full flex items-center justify-center">
              <IkonExclamationTriangle className="h-5" />
            </div>
            <span className="font-bold text-lg">Delete FAQ</span>
          </div>

          <button
            className="cursor-pointer p-2 text-black hover:bg-gray-100 rounded-md"
            onClick={() => onCancel()}
            disabled={isDeleting}
          >
            <IkonTutup className="h-5" />
          </button>
        </div>

        <div>Are you sure you want to delete this FAQ?</div>

        <div className="bg-gray-50 rounded-md p-4 flex flex-col gap-2">
          <h5 className="font-medium text-gray-900">
            {faq.question}
          </h5>
          <span className="text-gray-600 text-sm">{faq.kategori?.nama || "Uncategorized"}</span>
        </div>

        <div className="text-red-600 text-sm">
          Warning: This action cannot be undone.
        </div>

        <div className="flex justify-end gap-2">
          <Button
            color={ButtonColor.White}
            className="text-sm py-2! px-4!"
            disabled={isDeleting}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            color={ButtonColor.Red}
            leftIcon={<IkonHapus className="h-5" />}
            className="text-sm py-2! px-4!"
            disabled={isDeleting}
            onClick={onConfirm}
          >
            Yes, Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
