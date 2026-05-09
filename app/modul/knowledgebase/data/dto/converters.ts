import { KnowledgeBase } from '../KnowledgeBase'
import type { KnowledgeBaseResponseDto } from './KnowledgeBaseResponseDto'
import { intToStatusKnowledgeBase, type StatusKnowledgeBase } from '../StatusKnowledgeBase'

export function dtoToKnowledgeBase(dto: KnowledgeBaseResponseDto): KnowledgeBase {
  return new KnowledgeBase(
    dto.id,
    dto.docId,
    dto.judul,
    dto.idKategori,
    dto.namaBerkas,
    intToStatusKnowledgeBase(dto.status),
    dto.createdAt ? new Date(dto.createdAt) : null,
    dto.updatedAt ? new Date(dto.updatedAt) : null,
  )
}