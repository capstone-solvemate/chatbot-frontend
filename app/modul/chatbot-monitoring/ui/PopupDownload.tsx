import { Button, ButtonColor } from "~/komponen/Button";
import IkonTutup from "~/komponen/ikon/IkonTutup";

type Props = {
  onBatal: () => void;
  onDownload: () => void;
  onShare: () => void;
  tahun: number;
  bulan: number | null;
};

export default function PopupDownload({
  onBatal,
  onDownload,
  onShare,
  tahun,
  bulan,
}: Props) {
  function getBulanStr(bulan: number): string {
    const date = new Date();
    date.setMonth(bulan - 1);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(date);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800/70 backdrop-blur-sm z-50 print:hidden">
      <div className="w-full mx-auto max-w-md my-8 bg-white p-6 rounded-md border-gray-300">
        <div className="flex items-center gap-2 justify-between">
          <h3 className="font-semibold text-lg">Generate Summary Report</h3>
          <button onClick={onBatal} className="cursor-pointer p-2">
            <IkonTutup />
          </button>
        </div>

        <div className="bg-gray-100 text-sm p-4 mt-4 gap-1 flex flex-col rounded-md">
          <div className="flex gap-1 items-center">
            <div>Time Range:</div>
            <div>
              {bulan !== null && `${getBulanStr(bulan)} `}
              {tahun}
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <div>Format:</div>
            <div>PDF</div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Button
            className="text-sm py-2! grow"
            color={ButtonColor.White}
            onClick={onDownload}
          >
            Download
          </Button>
          <Button className="text-sm py-2! grow" onClick={onShare}>
            Share via Email
          </Button>
        </div>
      </div>
    </div>
  );
}
