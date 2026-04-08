import IkonChat from "./IkonChat";
import IkonFaq from "./IkonFaq";
import IkonHome from "./IkonHome";
import { IkonTiket } from "./IkonTiket";
import NavItem from "./NavItem";
import TampilanBrand from "./TampilanBrand";
import TampilanNotifikasi from "./TampilanNotifikasi";
import TampilanUserProfile from "./TampilanUserProfile";

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-200 bg-white fixed top-0 left-0 z-40">
      <div className="mx-auto flex h-16 items-center justify-between px-6">

        {/* Left */}
        <div className="flex items-center gap-8">
          <TampilanBrand />

          <nav className="flex items-center gap-2">
            <NavItem active icon={<IkonHome height={16} />}>Home</NavItem>
            <NavItem icon={<IkonFaq height={16} />}>FAQ</NavItem>
            <NavItem icon={<IkonChat height={16} />}>Chat Support</NavItem>
            <NavItem icon={<IkonTiket height={16} />}>My Tickets</NavItem>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <TampilanNotifikasi />
          <TampilanUserProfile />
        </div>
      </div>
    </header>
  )
}