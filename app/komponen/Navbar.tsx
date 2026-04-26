import { useLocation, useOutletContext } from "react-router";
import IkonChat from "./ikon/IkonChat";
import IkonFaq from "./ikon/IkonFaq";
import IkonHome from "./ikon/IkonHome";
import { IkonTiket } from "./ikon/IkonTiket";
import NavItem from "./NavItem";
import TampilanBrand from "./TampilanBrand";
import TampilanNotifikasi from "./TampilanNotifikasi";
import TampilanUserProfile from "./TampilanUserProfile";
import { PeranPengguna } from "~/dasar/PeranPengguna";
import type { ContextType } from "~/dasar/ContextType";
import { useEffect, useState } from "react";
import IkonDashboard from "./ikon/IkonDashboard";
import IkonKnowledgeBase from "./ikon/IkonKnowledgeBase";
import IkonBot from "./ikon/IkonBot";
import IkonSetting from "./ikon/IkonSetting";

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [devMode, stateOtentikasi, _a, _b, _c, promptLogout]: ContextType =
    useOutletContext();

  const [peran, setPeran] = useState<PeranPengguna>(
    stateOtentikasi.pengguna!.peran,
  );
  useEffect(() => {
    if (stateOtentikasi.pengguna) {
      setPeran(stateOtentikasi.pengguna.peran);
    }
  }, [stateOtentikasi]);

  return (
    <header
      className={`w-full border-b border-gray-200 bg-white fixed ${devMode ? "top-7" : "top-0"} left-0 z-40`}
    >
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-8">
          <TampilanBrand />

          <nav className="lg:flex items-center gap-2 hidden">
            {peran === PeranPengguna.Admin ? (
              <>
                <NavItem
                  href="/admin/dashboard"
                  active={pathname.startsWith("/admin/dashboard")}
                  icon={<IkonDashboard height={16} />}
                >
                  Dashboard
                </NavItem>
                <NavItem
                  active={pathname.startsWith("/admin/tiket")}
                  icon={<IkonTiket height={16} />}
                  href="/admin/tiket"
                >
                  Tickets
                </NavItem>
                <NavItem
                  active={pathname.startsWith("/admin/knowledge-base")}
                  icon={<IkonKnowledgeBase height={16} />}
                  href="/admin/knowledge-base"
                >
                  Knowledge Base
                </NavItem>
                <NavItem
                  active={pathname.startsWith("/admin/faq")}
                  href="/admin/faq"
                  icon={<IkonFaq height={16} />}
                >
                  FAQ Management
                </NavItem>
                <NavItem icon={<IkonBot height={16} />}>
                  Chatbot Monitoring
                </NavItem>
                <NavItem
                  active={pathname.startsWith("/admin/settings")}
                  href="/admin/settings/kategori"
                  icon={<IkonSetting height={16} />}
                >
                  Settings
                </NavItem>
              </>
            ) : (
              <>
                <NavItem
                  href="/"
                  active={pathname === "/"}
                  icon={<IkonHome height={16} />}
                >
                  Home
                </NavItem>
                <NavItem
                  active={pathname.startsWith("/faq")}
                  href="/faq"
                  icon={<IkonFaq height={16} />}
                >
                  FAQ
                </NavItem>
                <NavItem
                  active={pathname.startsWith("/chat")}
                  icon={<IkonChat height={16} />}
                  href="/chat"
                >
                  Chat Support
                </NavItem>
                <NavItem
                  active={pathname.startsWith("/tiket")}
                  icon={<IkonTiket height={16} />}
                  href="/tiket"
                >
                  My Tickets
                </NavItem>
              </>
            )}
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <TampilanNotifikasi />
          <TampilanUserProfile
            stateOtentikasi={stateOtentikasi}
            promptLogout={promptLogout}
          />
        </div>
      </div>
    </header>
  );
}
