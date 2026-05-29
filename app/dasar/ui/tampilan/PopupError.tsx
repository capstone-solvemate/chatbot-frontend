import type React from "react";
import { Button } from "~/komponen/Button";
import IkonExclamationCircle from "~/komponen/ikon/IkonExclamationCircle";

interface Props {
  title: string;
  message: string;
  closable: boolean;
  onClose?: () => void;
  closeCaption?: string;
}

export default function PopupError({
  title,
  message,
  closable,
  onClose,
  closeCaption,
}: Props): React.JSX.Element {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg min-w-md text-black p-4">
        <div className="flex text-red-700 gap-2 items-center justify-center">
          <IkonExclamationCircle />
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div className="border-b h-px my-2 border-gray-300" />
        <p>{message}</p>
        {closable && (
          <>
            <div className="border-b h-px mt-6 border-gray-300" />
            <div className="flex justify-center">
              <Button className="mt-2" onClick={onClose}>
                {closeCaption ?? "Close"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
