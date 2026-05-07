export class KnowledgeBase {
  constructor(
    public id: string,
    public docId: string,
    public namaBerkas: string,
    public path: string,
    public status: KnowledgeBaseStatus,
    public createdAt: Date | null,
    public updatedAt: Date | null,
  ) { }

  get isProcessing(): boolean {
    return this.status === KnowledgeBaseStatus.SedangDiproses
  }

  get isDone(): boolean {
    return this.status === KnowledgeBaseStatus.SelesaiDiproses
  }

  get isPending(): boolean {
    return this.status === KnowledgeBaseStatus.BelumDiproses
  }
}

export enum KnowledgeBaseStatus {
  BelumDiproses = 'BelumDiproses',
  SedangDiproses = 'SedangDiproses',
  SelesaiDiproses = 'SelesaiDiproses',
}