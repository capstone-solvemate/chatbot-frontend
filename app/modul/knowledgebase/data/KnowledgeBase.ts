import { StatusKnowledgeBase } from "./StatusKnowledgeBase"

export class KnowledgeBase {
  constructor(
    public id: string,
    public docId: string,
    public judul: string,
    public idKategori: number,
    public namaBerkas: string,
    public ukuranBerkas: number,
    public status: StatusKnowledgeBase,
    public createdAt: Date | null,
    public updatedAt: Date | null,
  ) { }

  get isPending(): boolean {
    return this.status === StatusKnowledgeBase.BelumDiproses
  }

  get isProcessing(): boolean {
    return this.status === StatusKnowledgeBase.SedangDiproses
  }

  get isDone(): boolean {
    return this.status === StatusKnowledgeBase.SelesaiDiproses
  }

  /** Derive tipe file dari ekstensi namaBerkas */
  get tipeFile(): string {
    const ext = this.namaBerkas.split('.').pop()?.toLowerCase() ?? ''
    switch (ext) {
      case 'pdf': return 'PDF'
      case 'txt': return 'Text'
      case 'doc':
      case 'docx': return 'DOC'
      default: return ext.toUpperCase() || 'File'
    }
  }

  /** Format ukuranBerkas bytes → "2.4 MB" atau "856 KB" */
  get ukuranBerkasFormatted(): string {
    if (this.ukuranBerkas >= 1_000_000) {
      return `${(this.ukuranBerkas / 1_000_000).toFixed(1)} MB`
    }
    return `${Math.round(this.ukuranBerkas / 1_000)} KB`
  }
}