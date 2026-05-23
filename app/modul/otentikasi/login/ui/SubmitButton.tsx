import { Button, ButtonColor } from "~/komponen/Button";

interface Props {
  disabled: boolean;
  formValid: boolean;
}

export default function SubmitButton({ disabled, formValid }: Props) {
  return (
    <Button
      type="submit"
      className="mt-6 w-full"
      disabled={disabled}
      color={formValid ? ButtonColor.Blue : ButtonColor.Gray}
    >
      Sign In
    </Button>
  );
}
