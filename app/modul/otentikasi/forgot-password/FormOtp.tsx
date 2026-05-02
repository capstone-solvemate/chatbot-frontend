import type React from "react";
import { useRef, useState } from "react";
import JudulOtentikasi from "../JudulOtentikasi";
import SubJudulOtentikasi from "../SubJudulOtentikasi";
import { Button } from "~/komponen/Button";
import { useOutletContext } from "react-router";
import type { ContextType } from "~/dasar/ContextType";
import { HttpError } from "~/dasar/KonektorBackend";

interface Props {
  email: string;
  onSuccess: (resetToken: string) => void;
  onRequestNewOtp: () => void;
}

type OtpFieldError =
  | { type: "wrong_otp"; attemptsLeft: number }
  | {
      type: "otp_locked" | "otp_expired" | "required" | "generic";
      message: string;
    };

export default function FormOtp({
  email,
  onSuccess,
  onRequestNewOtp,
}: Props): React.JSX.Element {
  const [_a, _b, konektorBackend, _c, setMasterError]: ContextType =
    useOutletContext();

  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [otpError, setOtpError] = useState<OtpFieldError | null>(null);
  const [loading, setLoading] = useState(false);

  const [resendLoading, setResendLoading] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);

  const isLocked =
    otpError?.type === "otp_locked" || otpError?.type === "otp_expired";

  function startCooldown() {
    setCooldownSeconds(120);
    const interval = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function handleDigitChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);
    setOtpError(null);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const newDigits = Array(6).fill("");
    pasted.split("").forEach((ch, i) => {
      newDigits[i] = ch;
    });
    setDigits(newDigits);
    setOtpError(null);
    const lastIndex = Math.min(pasted.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    const otp = digits.join("");
    if (otp.length < 6) {
      setOtpError({
        type: "required",
        message: "Please enter the 6-digit OTP code.",
      });
      return;
    }

    setLoading(true);
    setOtpError(null);

    try {
      const response = await konektorBackend.post(
        "/api/auth/forget-password/verify-otp",
        { email, otp },
      );
      const data = await response.json();
      onSuccess(data.reset_token);
    } catch (e: any) {
      if (e instanceof HttpError && e.status === 422) {
        const errors = e.payload as {
          field: string;
          error: string;
          message: string;
        }[];
        const otpErr = errors.find((err) => err.field === "otp");
        if (otpErr) {
          if (otpErr.error === "wrong_otp") {
            const match = otpErr.message.match(/\d+/g);
            const attemptsLeft = match ? parseInt(match[match.length - 1]) : 0;
            setOtpError({ type: "wrong_otp", attemptsLeft });
          } else if (otpErr.error === "otp_locked") {
            setOtpError({ type: "otp_locked", message: otpErr.message });
          } else if (otpErr.error === "otp_expired") {
            setOtpError({ type: "otp_expired", message: otpErr.message });
          } else {
            setOtpError({ type: "generic", message: otpErr.message });
          }
          return;
        }
      }
      setMasterError(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (resendLoading || cooldownSeconds > 0) return;

    setResendLoading(true);
    setResendSuccess(false);
    setOtpError(null);
    setDigits(Array(6).fill(""));

    try {
      await konektorBackend.post("/api/auth/forget-password/ask-otp", {
        email,
      });
      setResendSuccess(true);
    } catch (e: any) {
      if (e instanceof HttpError && e.status === 429) {
        startCooldown();
        return;
      }
      setMasterError(e);
    } finally {
      setResendLoading(false);
    }
  }

  const isCoolingDown = cooldownSeconds > 0;
  const minutes = Math.floor(cooldownSeconds / 60);
  const seconds = cooldownSeconds % 60;
  const countdownLabel = `${minutes}:${String(seconds).padStart(2, "0")}`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <JudulOtentikasi>Check Your Email</JudulOtentikasi>
      <SubJudulOtentikasi>
        A 6-digit code has been sent to your email
      </SubJudulOtentikasi>

      <p className="mt-1 text-center text-sm font-medium text-blue-600 break-all">
        {email}
      </p>

      <p className="mt-5 text-sm font-medium text-gray-700">Enter Code</p>

      {/* 6 kotak OTP */}
      <div className="mt-2 flex gap-2 justify-center" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            disabled={isLocked}
            onChange={(e) => handleDigitChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={[
              "w-10 h-12 text-center text-lg font-semibold rounded-lg border-2 outline-none transition-colors",
              "focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
              isLocked
                ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                : otpError
                  ? "border-red-400 bg-red-50"
                  : digit
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-300 bg-white",
            ].join(" ")}
          />
        ))}
      </div>

      {/* Error messages */}
      {otpError && (
        <div className="mt-3 text-sm text-center">
          {otpError.type === "wrong_otp" && (
            <p className="text-red-600">
              Incorrect OTP code.{" "}
              <span className="font-semibold">
                {otpError.attemptsLeft} attempt
                {otpError.attemptsLeft !== 1 ? "s" : ""} remaining.
              </span>
            </p>
          )}
          {(otpError.type === "otp_locked" ||
            otpError.type === "otp_expired") && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-red-700 font-medium">
                {otpError.type === "otp_locked"
                  ? "OTP locked due to too many failed attempts."
                  : "OTP has expired."}
              </p>
              <p className="text-red-600 mt-1">
                Please request a new OTP code.
              </p>
              <button
                type="button"
                onClick={onRequestNewOtp}
                className="mt-2 text-blue-600 font-semibold hover:underline"
              >
                ← Request New OTP
              </button>
            </div>
          )}
          {(otpError.type === "required" || otpError.type === "generic") && (
            <p className="text-red-600">{otpError.message}</p>
          )}
        </div>
      )}

      {resendSuccess && (
        <p className="mt-3 text-sm text-center text-green-600 font-medium">
          ✓ New OTP code sent successfully.
        </p>
      )}

      {!isLocked && (
        <Button
          type="submit"
          className="mt-5"
          disabled={loading || digits.join("").length < 6}
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>
      )}

      {!isLocked && (
        <p className="mt-4 text-sm text-center text-gray-500">
          Don't receive the code?{" "}
          {isCoolingDown ? (
            <span className="text-gray-400 tabular-nums">
              Resend in {countdownLabel}
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className="text-blue-600 font-semibold hover:underline disabled:opacity-50"
            >
              {resendLoading ? "Sending..." : "Resend"}
            </button>
          )}
        </p>
      )}
    </form>
  );
}
