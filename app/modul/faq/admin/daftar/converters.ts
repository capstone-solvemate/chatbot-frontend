import { Faq } from "../../Faq";

export function dtoToFaq(dto: Record<string, any>): Faq {
  return new Faq(
    dto.id,
    dto.idKategori,
    dto.question,
    dto.answer,
  );
}

export function dtoAdminToFaq(dto: Record<string, any>): Faq {
  return new Faq(
    dto.id,
    dto.idKategori,
    dto.question,
    dto.answer,
    dto.jumlahDilihat ?? 0,
    dto.jumlahHelpful ?? 0,
  );
}