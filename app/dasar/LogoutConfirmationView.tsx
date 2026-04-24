import type React from "react";
import { Button, ButtonColor } from "~/komponen/Button";
import { IkonLogout } from "~/komponen/ikon/IkonLogout";

interface Props {
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LogoutConfirmationView({
  loading,
  onCancel,
  onConfirm,
}: Props): React.JSX.Element {
  return (
    <div className="w-full h-full z-50 fixed top-0 left-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="p-8 bg-white shadow-md rounded-lg flex flex-col max-w-md gap-8">
        <div className="flex items-center gap-3">
          <div className="bg-red-50 text-red-600 w-12 h-12 p-3 rounded-full">
            <IkonLogout className="w-full" />
          </div>
          <h4 className="text-gray-900 text-xl font-semibold">
            Confirm Logout
          </h4>
        </div>

        <div className="text-gray-700">
          Are you sure you want to log out? You will need to sign in again to
          access the system.
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            disabled={loading}
            onClick={onCancel}
            className="text-sm py-2"
            color={ButtonColor.White}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={onConfirm}
            className="text-sm py-2"
            color={ButtonColor.Red}
            leftIcon={<IkonLogout className="h-5" />}
          >
            Yes, Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
