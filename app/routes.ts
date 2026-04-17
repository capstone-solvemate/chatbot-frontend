import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('dasar/LayoutDasar.tsx', [
    layout('dasar/LayoutPrivate.tsx', [
      index("modul/home/HalamanHome.tsx"),
      route("tiket", "modul/tiket/daftar/HalamanDaftarTiket.tsx"),
      route("tiket/:idtiket", "modul/tiket/detail/HalamanDetailTiket.tsx"),
      route("chat", "modul/chat/HalamanChat.tsx"),
    ]),
    layout('dasar/LayoutGuest.tsx', [
      route("login", "modul/otentikasi/login/HalamanLogin.tsx"),
    ])
  ])
] satisfies RouteConfig;
