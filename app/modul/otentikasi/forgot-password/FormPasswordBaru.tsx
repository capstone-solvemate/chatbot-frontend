import type React from "react";
import { useState } from "react";
import JudulOtentikasi from "../JudulOtentikasi";
import SubJudulOtentikasi from "../SubJudulOtentikasi";
import InputFieldOtentikasi from "../InputFieldOtentikasi";
import { Button } from "~/komponen/Button";
import { useOutletContext } from "react-router";
import type { ContextType } from "~/dasar/ContextType";
import { HttpError } from "~/dasar/KonektorBackend";
import IkonPassword from "~/komponen/ikon/IkonPassword";

interface Props {
  resetToken: string;
  onSuccess: () => void;
  onTokenExpired: () => void;
}

export default function FormPasswordBaru({
  resetToken,
  onSuccess,
  onTokenExpired,
}: Props): React.JSX.Element {
  const [_a, _b, konektorBackend, _c, setMasterError]: ContextType =
    useOutletContext();

  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [konfirmasiError, setKonfirmasiError] = useState<string | null>(null);

  function validate(): boolean {
    let valid = true;
    setPasswordError(null);
    setKonfirmasiError(null);

    if (passwordBaru.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      valid = false;
    }
    if (passwordBaru !== konfirmasiPassword) {
      setKonfirmasiError("Passwords do not match.");
      valid = false;
    }
    return valid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (!validate()) return;

    setLoading(true);

    try {
      await konektorBackend.post("/api/auth/forget-password/save-password", {
        reset_token: resetToken,
        password_baru: passwordBaru,
        konfirmasi_password: konfirmasiPassword,
      });
      onSuccess();
    } catch (e: any) {
      if (e instanceof HttpError && e.status === 422) {
        const errors = e.payload as {
          field: string;
          error: string;
          message: string;
        }[];
        for (const err of errors) {
          if (err.field === "konfirmasi_password") {
            setKonfirmasiError(err.message);
          } else if (err.field === "reset_token") {
            if (
              err.error === "reset_token_expired" ||
              err.error === "invalid_reset_token"
            ) {
              onTokenExpired();
              return;
            }
          }
        }
        return;
      }
      setMasterError(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <JudulOtentikasi>Create New Password</JudulOtentikasi>
      <SubJudulOtentikasi>
        Please your password to be strong and easy to remember
      </SubJudulOtentikasi>

      <InputFieldOtentikasi
        name="password_baru"
        label="New Password"
        type="password"
        placeholder="••••••••"
        icon={<IkonPassword />}
        className="mt-6"
        value={passwordBaru}
        onChange={(e) => {
          setPasswordBaru(e.target.value);
          setPasswordError(null);
        }}
        error={passwordError ?? undefined}
      />

      <InputFieldOtentikasi
        name="konfirmasi_password"
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        icon={<IkonPassword />}
        className="mt-4"
        value={konfirmasiPassword}
        onChange={(e) => {
          setKonfirmasiPassword(e.target.value);
          setKonfirmasiError(null);
        }}
        error={konfirmasiError ?? undefined}
      />

      <Button type="submit" className="mt-6" disabled={loading}>
        {loading ? "Saving..." : "Save Password"}
      </Button>
    </form>
  );
}
