export type EditPenggunaDto = {
  nama: string;
  email: string;
  peran: number[];
  passwordBaru?: string;
  is_active: boolean;
};