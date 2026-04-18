import type { InfoPengguna } from "./InfoPengguna";

export class StateOtentikasi {
  constructor(
    public loading: boolean,
    public pengguna?: InfoPengguna
  ) { }
}