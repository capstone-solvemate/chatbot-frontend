export default function UploadField() {
  return (
    <div>
      <label className="text-sm text-gray-600">Attachments (Optional)</label>

      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
        {/* Upload Icon */}
        {/* <UploadIcon /> */}

        <p className="text-sm text-gray-500 mt-2">
          Drop files here or click to upload
        </p>

        <button
          type="button"
          className="mt-3 px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md"
        >
          Choose Files
        </button>
      </div>
    </div>
  );
}
