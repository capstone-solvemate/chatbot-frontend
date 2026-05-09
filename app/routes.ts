import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('dasar/LayoutDasar.tsx', [
    layout('dasar/LayoutKaryawanLegacy.tsx', [
      index("modul/home/HalamanHome.tsx"),
      route("tiket/create/:idchat", "modul/tiket/buat/HalamanBuatTiket.tsx"),
      route("tiket/:idtiket", "modul/tiket/detail/HalamanDetailTiket.tsx"),
      route("chat", "modul/chat/HalamanChat.tsx"),
    ]),
    layout('dasar/LayoutKaryawan.tsx', [
      route('faq', 'modul/faq/karyawan/HalamanFaq.tsx'),
      route("tiket", "modul/tiket/daftar/HalamanDaftarTiket.tsx"),
    ]),
    layout('dasar/LayoutAdmin.tsx', [
      route('admin/dashboard', 'modul/dashboard/HalamanDashboardAdmin.tsx'),
      route('admin/faq', 'modul/faq/admin/daftar/HalamanDaftarFaqAdmin.tsx'),
      route('admin/tiket', 'modul/tiket/admin/daftar/HalamanDaftarTiketAdmin.tsx'),
      route('admin/tiket/:id', 'modul/tiket/admin/detail/HalamanDetailTiketAdmin.tsx'),
      route('admin/knowledge-base', 'modul/knowledgebase/ui/HalamanDaftarKnowledgeBaseAdmin.tsx'),
      route('admin/settings/kategori', 'modul/settings/kategori/daftar/HalamanDaftarKategori.tsx'),
    ]),
    layout('dasar/LayoutGuest.tsx', [
      route("forgot-password", "modul/otentikasi/forgot-password/HalamanForgotPassword.tsx")
    ]),
  ]),
  layout('dasar/layout/LayoutDasarV2.tsx', [
    layout('dasar/layout/LayoutGuestV2.tsx', [
      route("login", "modul/otentikasi/login/ui/HalamanLogin.tsx")
    ])
  ])
] satisfies RouteConfig;
