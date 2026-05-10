import { Button, ButtonColor } from "~/komponen/Button";
import IkonEdit from "~/komponen/ikon/IkonEdit";
import IkonHapus from "~/komponen/ikon/IkonHapus";

type FaqRowProps = {
  question: string;
  answer: string;
  jumlahDilihat: number;
  jumlahHelpful: number;
  onEdit: () => void;
  onHapus: () => void;
};

export default function FaqRow({
  question,
  answer,
  jumlahDilihat,
  jumlahHelpful,
  onEdit,
  onHapus,
}: FaqRowProps) {
  return (
    <div className="border-b last:border-b-0 border-gray-200 px-5 py-5 flex justify-between gap-6">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-gray-800 mb-2">{question}</h3>

        <p className="text-sm text-gray-500 truncate mb-3">{answer}</p>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {jumlahDilihat} Views
          </span>

          <span className="text-gray-300">•</span>

          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            {jumlahHelpful} Helpful
          </span>
        </div>
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
