export type PenggunaFormData = {
  nama: string;
  email: string;
  password: string;
  peran: number[]; // array of PeranPengguna int values
  isActive: boolean;
};