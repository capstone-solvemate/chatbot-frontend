import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('dasar/LayoutDasar.tsx', [
    index("modul/home/HalamanHome.tsx"),
    route("login", "modul/otentikasi/login/HalamanLogin.tsx"),
    route("tiket", "modul/tiket/daftar/HalamanDaftarTiket.tsx"),
    route("tiket/:idtiket", "modul/tiket/detail/HalamanDetailTiket.tsx"),
    route("chat", "modul/chat/HalamanChat.tsx"),
  ])
] satisfies RouteConfig;
