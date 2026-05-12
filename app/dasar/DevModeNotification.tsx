export default function DevModeNotification(): React.JSX.Element {
  return (
    <div className="fixed z-50 left-0 top-0 w-full h-7 flex items-center justify-center bg-red-600 text-white text-lg print:hidden">
      Development Mode
    </div>
  );
}
