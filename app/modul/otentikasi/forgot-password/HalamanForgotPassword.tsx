import type React from "react";
import CardOtentikasi from "../CardOtentikasi";
import type { Route } from "./+types/HalamanForgotPassword";
import LogoBrand2 from "~/komponen/LogoBrand2";
import { useState } from "react";
import { ForgotPasswordState } from "./ForgotPasswordState";
import FormEmail from "./FormEmail";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Forgot Password" }];
}

export default function HalamanForgotPassword(): React.JSX.Element {
  const [pageState, setPageState] = useState<ForgotPasswordState>(
    ForgotPasswordState.AskingEmail,
  );

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-linear-to-br from-blue-50 to-gray-100 p-6 sm:p-12">
      <CardOtentikasi>
        <div className="flex flex-col">
          <div className="w-16 h-16 flex items-center self-center justify-center rounded-2xl bg-blue-600 text-white">
            <LogoBrand2 className="w-9 h-9" />
          </div>
          {pageState === ForgotPasswordState.AskingEmail ? (
            <FormEmail />
          ) : (
            <></>
          )}
        </div>
      </CardOtentikasi>
    </div>
  );
}
