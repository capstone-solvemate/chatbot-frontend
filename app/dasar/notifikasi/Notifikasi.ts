export class Notifikasi {
  constructor(
    public id: number,
    public idPengguna: number,
    public judul: string,
    public deskripsi: string,
    public dibuatPada: Date,
    public dibacaPada: Date | null,
  ) { }
}