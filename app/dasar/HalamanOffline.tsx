import { Button } from "~/komponen/Button";

export default function HalamanOffline(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-linear-to-br from-blue-50 bg-gray-100 text-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          No Server Available
        </h1>
        <p className="text-gray-600 mb-6">
          There is an internet connection issue or the server is unavailable.
          Please try again later.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
