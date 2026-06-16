import { useEffect, useState } from "react";
import IkonUpload from "~/komponen/ikon/IkonUpload";

export default function DropHere() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    return () => {
      setShow(false);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex flex-col gap-2 items-center justify-center bg-gray-100 z-30 transition-all duration-200 ${!show && "opacity-0"}`}
    >
      <IkonUpload className="w-8 h-8" />
      <p>Drop Here</p>
    </div>
  );
}
