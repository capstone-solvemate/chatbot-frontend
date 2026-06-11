import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('dasar/ui/layout/LayoutDasarV2.tsx', [
    layout('dasar/layout/LayoutGuestV2.tsx', [
      route("login", "modul/otentikasi/login/ui/HalamanLogin.tsx"),
      route("forgot-password", "modul/otentikasi/forgot-password/HalamanForgotPassword.tsx")
    ]),
    layout('dasar/ui/layout/LayoutKaryawanV2.tsx', [
      index("modul/home/HalamanHome.tsx"),
      route('faq', 'modul/faq/karyawan/HalamanFaq.tsx'),
      layout('modul/chatbot/ui/LayoutHalamanChatbot.tsx', [
        route("chat/:id?", "modul/chatbot/ui/HalamanChat.tsx"),
      ]),
      route("tiket", "modul/tiket/daftar/HalamanDaftarTiket.tsx"),
      route("tiket/create/:idchat", "modul/tiket/buat/HalamanBuatTiket.tsx"),
      route("tiket/:idtiket", "modul/tiket/detail/HalamanDetailTiket.tsx"),
    ]),
    layout('dasar/ui/layout/LayoutAdminV2.tsx', [
      route('admin/dashboard', 'modul/dashboard/HalamanDashboardAdmin.tsx'),
      route('admin/chatbot-monitoring', 'modul/chatbot-monitoring/ui/HalamanChatbotMonitoring.tsx'),
      route('admin/faq', 'modul/faq/admin/daftar/HalamanDaftarFaqAdmin.tsx'),
      route('admin/tiket', 'modul/tiket/admin/daftar/HalamanDaftarTiketAdmin.tsx'),
      route('admin/tiket/:id', 'modul/tiket/admin/detail/HalamanDetailTiketAdmin.tsx'),
      route('admin/knowledge-base', 'modul/knowledgebase/ui/HalamanDaftarKnowledgeBaseAdmin.tsx'),
      layout('modul/settings/SettingsLayout.tsx', [
        route('admin/settings/kategori', 'modul/settings/kategori/ui/HalamanKategori.tsx'),

        route('admin/settings/pengguna', 'modul/settings/pengguna/daftar/ui/HalamanDaftarPengguna.tsx'),
        route('admin/settings/pengguna/tambah', 'modul/settings/pengguna/tambah/ui/HalamanTambahPengguna.tsx'),
        route('admin/settings/pengguna/:id/edit', 'modul/settings/pengguna/edit/ui/HalamanEditPengguna.tsx')
      ])
    ]),
  ])
] satisfies RouteConfig;
