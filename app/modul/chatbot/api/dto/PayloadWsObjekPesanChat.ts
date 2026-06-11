export class PayloadWsObjekPesanChat {
  constructor(
    public readonly id: string,
    public readonly pesan: string,
    public readonly tanggalDibuat: string,
    public readonly chatAsisten: boolean,
    public readonly gagal: boolean,
    public readonly daftarLampiran: {
      id: string,
    }[],
  ) { }
}