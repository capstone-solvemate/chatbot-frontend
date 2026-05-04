import type { Kategori } from "../settings/kategori/Kategori";
import type { StatusTiket } from "./StatusTiket";

export class Tiket {
  constructor(
    public id: string,
    public judul: string,
    public deskripsi: string,
    public idKategori: number,
    public idChat: string,
    public status: StatusTiket,
    public dibuatPada: Date,
    public diperbaruiPada: Date,
    public kategori: Kategori | null = null
  ) { }
}