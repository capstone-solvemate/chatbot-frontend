// InputField.tsx
type InputFieldProps = {
  label: string;
  required?: boolean;
  placeholder?: string;
  name: string;
  id?: string;
  error?: string;
};

export default function InputField({
  label,
  required,
  placeholder,
  name,
  id,
  error,
}: InputFieldProps) {
  return (
    <div>
      <label className="text-sm text-gray-600" htmlFor={id ?? name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        id={id ?? name}
        className={`w-full mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-200"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
