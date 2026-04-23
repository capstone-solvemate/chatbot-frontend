export default function SelectField({
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

      <div className="relative">
        <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white">
          <option>Select a category</option>
        </select>

        {/* Icon Dropdown */}
        {/* <ChevronDownIcon /> */}
      </div>
    </div>
  );
}
