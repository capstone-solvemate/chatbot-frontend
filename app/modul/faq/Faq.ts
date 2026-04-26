import type { Kategori } from "../settings/kategori/Kategori";

export class Faq {
  constructor(
    public id: number,
    public idKategori: number,
    public question: string,
    public answer: string,
    public kategori: Kategori | null = null
  ) { }
}