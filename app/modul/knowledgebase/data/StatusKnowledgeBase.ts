export enum StatusKnowledgeBase {
  BelumDiproses,
  SedangDiproses,
  SelesaiDiproses,
  GagalDiproses
}

export function intToStatusKnowledgeBase(value: number): StatusKnowledgeBase {
  switch (value) {
    case 2:
      return StatusKnowledgeBase.SedangDiproses;
    case 3:
      return StatusKnowledgeBase.SelesaiDiproses;
    case 4:
      return StatusKnowledgeBase.GagalDiproses;
    default:
      return StatusKnowledgeBase.BelumDiproses;
  }
}