export default function TampilanUserProfile() {
  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="text-sm font-medium text-gray-800">
          John Smith
        </p>
        <p className="text-xs text-gray-500">
          Employee ID: EMP123
        </p>
      </div>

      <button className="text-gray-500 hover:text-gray-700">
        {/* <LogOut className="h-5 w-5" /> */}
      </button>
    </div>
  )
}