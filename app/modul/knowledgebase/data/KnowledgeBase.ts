import { StatusKnowledgeBase } from "./StatusKnowledgeBase"

export class KnowledgeBase {
  constructor(
    public id: string,
    public docId: string,
    public judul: string,
    public idKategori: number,
    public namaBerkas: string,
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
}