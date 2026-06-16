export class PesanTiket {
  constructor(
    public id: string,
    public idTiket: string,
    public idPembuat: number,
    public pesan: string,
    public dibuatPada: Date,
    public lampiranIds: string[] = []
  ) { }
}