import type React from "react";
import CardOtentikasi from "../CardOtentikasi";
import type { Route } from "./+types/HalamanForgotPassword";
import LogoBrand2 from "~/komponen/LogoBrand2";
import { useState } from "react";
import { ForgotPasswordState } from "./ForgotPasswordState";
import FormEmail from "./FormEmail";
import FormOtp from "./FormOtp";
import FormPasswordBaru from "./FormPasswordBaru";
import SuksesGantiPassword from "./SuksesGantiPassword";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Forgot Password" }];
}

export default function HalamanForgotPassword(): React.JSX.Element {
  const [pageState, setPageState] = useState<ForgotPasswordState>(
    ForgotPasswordState.AskingEmail,
  );

  // Data yang dibawa antar tahap
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

  function handleEmailSuccess(submittedEmail: string) {
    setEmail(submittedEmail);
    setPageState(ForgotPasswordState.VerifyingOtp);
  }

  function handleOtpSuccess(token: string) {
    setResetToken(token);
    setPageState(ForgotPasswordState.CreatingNewPassword);
  }

  function handlePasswordSuccess() {
    setPageState(ForgotPasswordState.Success);
  }

  function handleRequestNewOtp() {
    // Kembali ke Tahap 1 tapi pertahankan email supaya tidak perlu ketik ulang
    setPageState(ForgotPasswordState.AskingEmail);
  }

  function handleTokenExpired() {
    // reset_token expired/invalid → mulai dari awal
    setEmail("");
    setResetToken("");
    setPageState(ForgotPasswordState.AskingEmail);
  }

  const isSuccess = pageState === ForgotPasswordState.Success;

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-linear-to-br from-blue-50 to-gray-100 p-6 sm:p-12">
      <CardOtentikasi>
        <div className="flex flex-col">
          {/* Logo — disembunyikan di success screen karena success punya icon sendiri */}
          {!isSuccess && (
            <div className="w-16 h-16 flex items-center self-center justify-center rounded-2xl bg-blue-600 text-white">
              <LogoBrand2 className="w-9 h-9" />
            </div>
          )}

          {pageState === ForgotPasswordState.AskingEmail && (
            <FormEmail onSuccess={handleEmailSuccess} />
          )}

          {pageState === ForgotPasswordState.VerifyingOtp && (
            <FormOtp
              email={email}
              onSuccess={handleOtpSuccess}
              onRequestNewOtp={handleRequestNewOtp}
            />
          )}

          {pageState === ForgotPasswordState.CreatingNewPassword && (
            <FormPasswordBaru
              resetToken={resetToken}
              onSuccess={handlePasswordSuccess}
              onTokenExpired={handleTokenExpired}
            />
          )}

          {pageState === ForgotPasswordState.Success && <SuksesGantiPassword />}
        </div>
      </CardOtentikasi>
    </div>
  );
}
