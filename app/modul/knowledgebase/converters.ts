import { KnowledgeBase, KnowledgeBaseStatus } from './KnowledgeBase'

export function dtoToKnowledgeBase(dto: Record<string, any>): KnowledgeBase {
  return new KnowledgeBase(
    dto.id,
    dto.doc_id,
    dto.nama_berkas,
    dto.path,
    dto.status as KnowledgeBaseStatus,
    dto.createdAt ? new Date(dto.createdAt) : null,
    dto.updatedAt ? new Date(dto.updatedAt) : null,
  )
}