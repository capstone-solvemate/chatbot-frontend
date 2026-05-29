export class PesanChat {
  constructor(
    public readonly id: string,
    public readonly pesan: string,
    public readonly chatAsisten: boolean,
    public readonly tanggalDibuat: Date,
    public readonly gagal: boolean
  ) { }
}