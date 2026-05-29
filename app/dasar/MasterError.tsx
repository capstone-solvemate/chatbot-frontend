import type React from "react";
import PopupError from "./ui/tampilan/PopupError";

interface Props {
  message: string;
  closable: boolean;
  onClose?: () => void;
}

export default function MasterError({
  message,
  closable,
  onClose,
}: Props): React.JSX.Element {
  return (
    <PopupError
      message={message}
      closable={closable}
      onClose={onClose}
      title="Master Error"
    />
  );
}
