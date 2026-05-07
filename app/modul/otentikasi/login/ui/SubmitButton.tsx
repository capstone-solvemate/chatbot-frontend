import { Button } from "~/komponen/Button";

interface Props {
  disabled?: boolean;
}

export default function SubmitButton({ disabled = false }: Props) {
  return (
    <Button type="submit" className="mt-6 w-full" disabled={disabled}>
      Sign In
    </Button>
  );
}
