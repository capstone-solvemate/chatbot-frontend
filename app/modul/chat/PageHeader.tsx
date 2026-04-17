import { useOutletContext } from "react-router";

export default function PageHeader() {
  const [devMode]: [boolean] = useOutletContext();

  return (
    <div
      className={`flex flex-col border-y border-gray-200 py-4 justify-center px-6 fixed ${devMode ? "top-23" : "top-16"} bg-white z-40 h-20 w-full`}
    >
      <h1 className="text-xl font-semibold text-gray-900">AI Assistant</h1>

      <p className="text-sm text-gray-600">
        Get instant help from our AI-powered assistant
      </p>
    </div>
  );
}
