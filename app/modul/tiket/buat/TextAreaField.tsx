// TextAreaField.tsx
export default function TextareaField({
  label,
  required,
  name,
  error,
}: {
  label: string;
  required?: boolean;
  name: string;
  error?: string;
}) {
  return (
    <div>
      <label className="text-sm text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        rows={4}
        placeholder="Provide detailed information about your issue..."
        name={name}
        className={`w-full mt-1 px-3 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
