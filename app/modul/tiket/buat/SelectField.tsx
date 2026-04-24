export default function SelectField({
  label,
  required,
  options,
}: {
  label: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="text-sm text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-white">
          <option>-- Select a category --</option>
          {options?.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
