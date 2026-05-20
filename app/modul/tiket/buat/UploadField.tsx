import IkonUpload from "~/komponen/ikon/IkonUpload";

export default function UploadField() {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600">Attachments (Optional)</label>

      <input type="file" id="attachments-input" className="hidden" />

      <button
        type="button"
        className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center cursor-pointer"
        onClick={() => document.getElementById("attachments-input")?.click()}
      >
        <div className="flex justify-center text-gray-400">
          <IkonUpload />
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Drop files here or click to upload
        </p>

        <div className="mt-3 px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md">
          Choose Files
        </div>
      </button>
    </div>
  );
}
