import type React from "react";
import type { Route } from "./+types/HalamanLogin";
import LoginCard from "./LoginCard";
import { useState } from "react";
import { Peran } from "../Peran";
import { HttpError, type KonektorBackend } from "~/dasar/KonektorBackend";
import { useOutletContext } from "react-router";
import { LoginDto } from "./LoginDto";
import type { ContextType } from "~/dasar/ContextType";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }];
}

export default function HalamanLogin(): React.JSX.Element {
  const [_dm, _so, konektorBackend, _sn, setMasterError]: ContextType =
    useOutletContext();
  const [peran, setPeran] = useState(Peran.Karyawan);
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  async function handleSubmit(data: LoginFormData) {
    if (submitting) return;
    setSubmitting(true);

    try {
      const loginDto = new LoginDto(data.email, data.password);

      if (peran === Peran.Karyawan) {
        await konektorBackend.postU(
          "/api/auth/login/employee",
          loginDto.toPlainObj(),
        );
        location.reload();
      } else {
      }
    } catch (e: any) {
      if (e instanceof HttpError && e.status === 401) {
        setAuthError("Invalid credentials");
      } else {
        setMasterError(e);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-linear-to-br from-blue-50 to-gray-100 p-6 sm:p-12">
      <LoginCard
        peran={peran}
        onSetPeran={(peran) => setPeran(peran)}
        submitting={submitting}
        onSubmit={(data) => handleSubmit(data)}
        authError={authError}
        onClearAuthError={() => setAuthError(null)}
      />
    </div>
  );
}
