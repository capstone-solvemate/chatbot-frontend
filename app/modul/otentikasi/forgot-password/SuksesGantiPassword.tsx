import type React from "react";
import { Button } from "~/komponen/Button";
import { useNavigate } from "react-router";

export default function SuksesGantiPassword(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center">
      {/* Checkmark icon */}
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 border-2 border-dashed border-green-400">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="mt-5 text-xl font-bold text-gray-800">
        Password Changed Successfully
      </h2>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed">
        Your password has been updated.
        <br />
        Please login with your new password.
      </p>

      <Button
        type="button"
        className="mt-6 w-full"
        onClick={() => navigate("/login")}
      >
        Login Now
      </Button>
    </div>
  );
}
