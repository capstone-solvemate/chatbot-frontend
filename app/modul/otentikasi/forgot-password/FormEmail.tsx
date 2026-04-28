import type React from "react";
import JudulOtentikasi from "../JudulOtentikasi";
import SubJudulOtentikasi from "../SubJudulOtentikasi";
import InputFieldOtentikasi from "../InputFieldOtentikasi";
import IkonEmail from "~/komponen/ikon/IkonEmail";
import { Button } from "~/komponen/Button";
import LinkOtentikasi from "../LinkOtentikasi";

export default function FormEmail(): React.JSX.Element {
  return (
    <form method="POST" className="flex flex-col">
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
      />

      <Button type="submit" className="mt-6">
        Send OTP Code
      </Button>
      <LinkOtentikasi to="/login" className="self-center">
        Back to Login
      </LinkOtentikasi>
    </form>
  );
}
