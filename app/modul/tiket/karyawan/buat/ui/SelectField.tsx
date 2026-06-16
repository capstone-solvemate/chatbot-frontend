// SelectField.tsx
export default function SelectField({
  label,
  required,
  options,
  name,
  error,
}: {
  label: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  name: string;
  error?: string;
}) {
  return (
    <div>
      <label className="text-sm text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          className={`w-full mt-1 px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-400" : "border-gray-300"
          }`}
        >
          <option value="">-- Select a category --</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
