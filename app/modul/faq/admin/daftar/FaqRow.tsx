import { Button, ButtonColor } from "~/komponen/Button";
import IkonEdit from "~/komponen/ikon/IkonEdit";
import IkonHapus from "~/komponen/ikon/IkonHapus";

type FaqRowProps = {
  question: string;
  answer: string;
  onEdit: () => void;
  onHapus: () => void;
};

export default function FaqRow({
  question,
  answer,
  onEdit,
  onHapus,
}: FaqRowProps) {
  return (
    <div className="border-b last:border-b-0 border-gray-200 px-5 py-5 flex justify-between gap-6">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-gray-800 mb-2">{question}</h3>

        <p className="text-sm text-gray-500 truncate">{answer}</p>
      </div>

      <div className="flex items-start gap-2 shrink-0">
        <Button
          className="px-3! py-1.5! text-xs gap-1!"
          color={ButtonColor.White}
          leftIcon={<IkonEdit className="h-4" />}
          onClick={onEdit}
        >
          Edit
        </Button>

        <Button
          className="px-3! py-1.5! text-xs gap-1! text-red-600!"
          color={ButtonColor.White}
          leftIcon={<IkonHapus className="h-4" />}
          onClick={onHapus}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
