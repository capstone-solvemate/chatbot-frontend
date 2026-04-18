import type { PeranPengguna } from "./PeranPengguna";

export class InfoPengguna {
  constructor(public id: number, public nama: string, peran: PeranPengguna) { }
}