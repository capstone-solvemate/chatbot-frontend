import { Faq } from "../../Faq";

export function dtoToFaq(dto: Record<string, any>): Faq {
  return new Faq(
    dto.id,
    dto.idKategori,
    dto.question,
    dto.answer,
  );
}
