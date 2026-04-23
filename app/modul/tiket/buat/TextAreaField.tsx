export default function TextareaField({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <textarea
        rows={4}
        placeholder="Provide detailed information about your issue..."
        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
