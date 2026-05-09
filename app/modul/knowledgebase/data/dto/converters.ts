import { KnowledgeBase } from '../KnowledgeBase'
import { intToStatusKnowledgeBase, type StatusKnowledgeBase } from '../StatusKnowledgeBase'
import type { KnowledgeBaseResponseDto } from './KnowledgeBaseResponseDto'

export function dtoToKnowledgeBase(dto: KnowledgeBaseResponseDto): KnowledgeBase {
  return new KnowledgeBase(
    dto.id,
    dto.docId,
    dto.judul,
    dto.idKategori,
    dto.namaBerkas,
    dto.ukuranBerkas,
    intToStatusKnowledgeBase(dto.status),
    dto.createdAt ? new Date(dto.createdAt) : null,
    dto.updatedAt ? new Date(dto.updatedAt) : null,
  )
}