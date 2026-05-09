export enum StatusKnowledgeBase {
  BelumDiproses,
  SedangDiproses,
  SelesaiDiproses,
}

export function intToStatusKnowledgeBase(value: number): StatusKnowledgeBase {
  switch (value) {
    case 2:
      return StatusKnowledgeBase.SedangDiproses;
    case 3:
      return StatusKnowledgeBase.SelesaiDiproses;
    default:
      return StatusKnowledgeBase.BelumDiproses;
  }
}