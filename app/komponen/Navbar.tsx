import NavItem from "./NavItem";
import TampilanBrand from "./TampilanBrand";
import TampilanNotifikasi from "./TampilanNotifikasi";
import TampilanUserProfile from "./TampilanUserProfile";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white fixed top-0 left-0">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Left */}
        <div className="flex items-center gap-8">
          <TampilanBrand />

          <nav className="flex items-center gap-2">
            <NavItem active>Home</NavItem>
            <NavItem>FAQ</NavItem>
            <NavItem>Chat Support</NavItem>
            <NavItem>My Tickets</NavItem>
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