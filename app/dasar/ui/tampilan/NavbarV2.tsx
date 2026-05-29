import { useLocation } from "react-router";
import IkonChat from "../../../komponen/ikon/IkonChat";
import IkonFaq from "../../../komponen/ikon/IkonFaq";
import IkonHome from "../../../komponen/ikon/IkonHome";
import { IkonTiket } from "../../../komponen/ikon/IkonTiket";
import NavItem from "../../../komponen/NavItem";
import TampilanBrand from "../../../komponen/TampilanBrand";
import TampilanUserProfile from "../../../komponen/TampilanUserProfile";
import { PeranPengguna } from "~/dasar/PeranPengguna";
import { useEffect, useState } from "react";
import IkonDashboard from "../../../komponen/ikon/IkonDashboard";
import IkonKnowledgeBase from "../../../komponen/ikon/IkonKnowledgeBase";
import IkonBot from "../../../komponen/ikon/IkonBot";
import IkonSetting from "../../../komponen/ikon/IkonSetting";
import { useStateOtentikasi } from "~/dasar/hooks/useStateOtentikasi";
import { usePromptLogout } from "~/dasar/hooks/usePromptLogout";
import TampilanNotifikasiV2 from "../../../komponen/TampilanNotifikasiV2";
import { useEnvironment } from "~/dasar/hooks/useEnvironment";
import { Environment } from "~/dasar/types/Environment";

export default function NavbarV2() {
  const location = useLocation();
  const pathname = location.pathname;
  const notProductionMode = useEnvironment() !== Environment.Production;
  const stateOtentikasi = useStateOtentikasi();
  const promptLogout = usePromptLogout();

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
      className={`w-full border-b border-gray-200 bg-white fixed ${notProductionMode ? "top-7" : "top-0"} left-0 z-40 print:hidden`}
    >
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <TampilanBrand />
            {peran === PeranPengguna.Admin && (
              <div className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                Admin
              </div>
            )}
          </div>
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
                <NavItem
                  active={pathname.startsWith("/admin/chatbot-monitoring")}
                  href="/admin/chatbot-monitoring"
                  icon={<IkonBot height={16} />}
                >
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
          <TampilanNotifikasiV2 />
          <TampilanUserProfile
            stateOtentikasi={stateOtentikasi}
            promptLogout={promptLogout}
          />
        </div>
      </div>
    </header>
  );
}
