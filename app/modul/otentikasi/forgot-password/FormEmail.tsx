import type React from "react";
import { useState } from "react";
import JudulOtentikasi from "../JudulOtentikasi";
import SubJudulOtentikasi from "../SubJudulOtentikasi";
import InputFieldOtentikasi from "../InputFieldOtentikasi";
import IkonEmail from "~/komponen/ikon/IkonEmail";
import { Button } from "~/komponen/Button";
import LinkOtentikasi from "../LinkOtentikasi";
import { useOutletContext } from "react-router";
import type { ContextType } from "~/dasar/ContextType";
import { HttpError } from "~/dasar/KonektorBackend";

interface Props {
  onSuccess: (email: string) => void;
}

export default function FormEmail({ onSuccess }: Props): React.JSX.Element {
  const [_a, _b, konektorBackend, _c, setMasterError]: ContextType =
    useOutletContext();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || cooldownSeconds > 0) return;

    setEmailError(null);
    setLoading(true);

    try {
      await konektorBackend.post("/api/auth/forget-password/ask-otp", {
        email,
      });
      onSuccess(email);
    } catch (e: any) {
      if (e instanceof HttpError) {
        if (e.status === 422) {
          const errors = e.payload as {
            field: string;
            error: string;
            message: string;
          }[];
          const emailErr = errors.find((err) => err.field === "email");
          if (emailErr) {
            setEmailError(emailErr.message);
            return;
          }
        }
        if (e.status === 429) {
          startCooldown();
          return;
        }
      }
      setMasterError(e);
    } finally {
      setLoading(false);
    }
  }

  const isCoolingDown = cooldownSeconds > 0;
  const minutes = Math.floor(cooldownSeconds / 60);
  const seconds = cooldownSeconds % 60;
  const countdownLabel = `${minutes}:${String(seconds).padStart(2, "0")}`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <JudulOtentikasi>Forgot Password</JudulOtentikasi>
      <SubJudulOtentikasi>
        Enter your email address. We will send you a verification code
      </SubJudulOtentikasi>

      <InputFieldOtentikasi
        name="email"
        label="Email Address"
        type="email"
        placeholder="you@company.com"
        icon={<IkonEmail />}
        className="mt-6"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError ?? undefined}
      />

      {isCoolingDown && (
        <p className="mt-3 text-sm text-amber-600 text-center">
          Too many requests. Try again in{" "}
          <span className="font-semibold tabular-nums">{countdownLabel}</span>
        </p>
      )}

      <Button
        type="submit"
        className="mt-6"
        disabled={loading || isCoolingDown}
      >
        {loading
          ? "Sending..."
          : isCoolingDown
            ? `Resend in ${countdownLabel}`
            : "Send OTP Code"}
      </Button>

      <LinkOtentikasi to="/login" className="self-center">
        Back to Login
      </LinkOtentikasi>
    </form>
  );
}
