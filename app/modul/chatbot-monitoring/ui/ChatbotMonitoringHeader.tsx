import { Button } from "~/komponen/Button";

type Props = {
  onOpenDownload: () => void;
};

export default function ChatbotMonitoringHeader({ onOpenDownload }: Props) {
  return (
    <header className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">
          Chatbot Monitoring
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor AI chatbot performance and activity
        </p>
      </div>

      <Button
        onClick={() => onOpenDownload()}
        className="text-sm! ps-3! pe-4! py-2! gap-2! print:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        Download Summary Report
      </Button>
    </header>
  );
}
