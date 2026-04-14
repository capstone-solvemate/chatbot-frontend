import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("modul/home/HalamanHome.tsx"),
  route("tiket", "modul/tiket/daftar/HalamanDaftarTiket.tsx"),
  route("tiket/:idtiket", "modul/tiket/detail/HalamanDetailTiket.tsx"),
] satisfies RouteConfig;
