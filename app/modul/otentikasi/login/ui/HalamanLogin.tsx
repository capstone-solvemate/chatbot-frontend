import type React from "react";
import type { Route } from "./+types/HalamanLogin";
import LoginCard from "./LoginCard";
import { useEffect, useState } from "react";
import { HttpError } from "~/dasar/KonektorBackend";
import type { LoginDto } from "~/modul/otentikasi/login/data/LoginDto";
import {
  PeranPengguna,
  peranPenggunaToString,
  stringToPeranPengguna,
} from "~/dasar/PeranPengguna";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import { useMasterError } from "~/dasar/hooks/useMasterError";

const KEY_PERAN_LOGIN = "peran_login";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }];
}

export default function HalamanLogin(): React.JSX.Element {
  const konektorBackend = useKonektorBackend();
  const { setMasterError } = useMasterError();
  const [peran, setPeran] = useState(PeranPengguna.Karyawan);
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const peranTersimpanStr = localStorage.getItem(KEY_PERAN_LOGIN);
    if (!peranTersimpanStr) {
      return;
    }
    const peranTersimpan =
      stringToPeranPengguna(peranTersimpanStr) || PeranPengguna.Karyawan;
    setPeran(peranTersimpan);
  }, []);

  function ubahPeran(peran: PeranPengguna) {
    localStorage.setItem(KEY_PERAN_LOGIN, peranPenggunaToString(peran));
    setPeran(peran);
  }

  async function handleSubmit(data: LoginFormData) {
    if (submitting) return;
    setSubmitting(true);

    try {
      const loginDto: LoginDto = {
        email: data.email,
        password: data.password,
      };

      if (peran === PeranPengguna.Karyawan) {
        await konektorBackend.post("/api/auth/login/employee", loginDto);
      } else {
        await konektorBackend.post("/api/auth/login/admin", loginDto);
      }
      location.reload();
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
        onSetPeran={(peran) => ubahPeran(peran)}
        submitting={submitting}
        onSubmit={(data) => handleSubmit(data)}
        authError={authError}
        onClearAuthError={() => setAuthError(null)}
      />
    </div>
  );
}
