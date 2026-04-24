import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('dasar/LayoutDasar.tsx', [
    layout('dasar/LayoutKaryawan.tsx', [
      index("modul/home/HalamanHome.tsx"),
      route("tiket", "modul/tiket/daftar/HalamanDaftarTiket.tsx"),
      route("tiket/create/:idchat", "modul/tiket/buat/HalamanBuatTiket.tsx"),
      route("tiket/:idtiket", "modul/tiket/detail/HalamanDetailTiket.tsx"),
      route("chat", "modul/chat/HalamanChat.tsx"),
    ]),
    layout('dasar/LayoutAdmin.tsx', [
      route('admin/dashboard', 'modul/dashboard/HalamanDashboardAdmin.tsx')
    ]),
    layout('dasar/LayoutGuest.tsx', [
      route("login", "modul/otentikasi/login/HalamanLogin.tsx"),
    ])
  ])
] satisfies RouteConfig;
