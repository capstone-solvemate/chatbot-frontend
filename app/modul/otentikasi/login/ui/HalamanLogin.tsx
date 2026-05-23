import type React from "react";
import type { Route } from "./+types/HalamanLogin";
import { useEffect, useRef, useState } from "react";
import { HttpError } from "~/dasar/KonektorBackend";
import type { LoginDto } from "~/modul/otentikasi/login/data/LoginDto";
import {
  PeranPengguna,
  peranPenggunaToString,
  stringToPeranPengguna,
} from "~/dasar/PeranPengguna";
import { useKonektorBackend } from "~/dasar/hooks/useKonektorBackend";
import { useMasterError } from "~/dasar/hooks/useMasterError";
import CardOtentikasi from "../../CardOtentikasi";
import LoginHeader from "./LoginHeader";
import AuthErrorNotification from "./AuthErrorNotification";
import RoleSelector from "./RoleSelector";
import SubmitButton from "./SubmitButton";
import LinkOtentikasi from "../../LinkOtentikasi";
import { useForm } from "@felte/react";
import { validator } from "@felte/validator-yup";
import LoginForm from "./LoginForm";
import * as yup from "yup";

const KEY_PERAN_LOGIN = "peran_login";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }];
}

export default function HalamanLogin(): React.JSX.Element {
  const konektorBackend = useKonektorBackend();
  const { setMasterError } = useMasterError();
  const [peran, setPeran] = useState(PeranPengguna.Karyawan);
  const [authError, setAuthError] = useState<string | null>(null);

  const refPeran = useRef<PeranPengguna>(PeranPengguna.Karyawan);
  useEffect(() => {
    refPeran.current = peran;
  }, [peran]);

  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  const {
    form,
    isSubmitting,
    isValid,
    errors: fieldErrors,
  } = useForm({
    onSubmit: async (data) => {
      try {
        const loginDto: LoginDto = {
          email: data.email,
          password: data.password,
        };

        if (refPeran.current === PeranPengguna.Karyawan) {
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
      }
    },
    extend: validator({
      schema: validationSchema,
    }),
  });

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

  function clearAuthError() {
    setAuthError(null);
  }

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-linear-to-br from-blue-50 to-gray-100 p-6 sm:p-12">
      <CardOtentikasi>
        <form method="POST" ref={form} className="flex flex-col items-center">
          <LoginHeader />
          {authError && (
            <AuthErrorNotification
              message={authError}
              onClear={clearAuthError}
            />
          )}
          <RoleSelector peran={peran} onSetPeran={ubahPeran} />
          <LoginForm fieldErrors={fieldErrors()} />
          <SubmitButton disabled={isSubmitting()} formValid={isValid()} />
          <LinkOtentikasi to="/forgot-password">
            Forgot your password?
          </LinkOtentikasi>
        </form>
      </CardOtentikasi>
    </div>
  );
}
