export class Chat {
  constructor(
    public readonly id: string,
    public readonly subjek: string,
    public readonly tanggalDibuat: Date,
    public readonly sedangDiproses: boolean,
    public readonly dialihkanKeTiket: boolean,
  ) { }
}