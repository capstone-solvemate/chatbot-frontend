export enum PeranPengguna {
  Karyawan,
  Admin,
}

export function peranPenggunaToString(peran: PeranPengguna, bahasa: 'id' | 'en' = 'id'): string {
  if (bahasa === 'en') {
    switch (peran) {
      case PeranPengguna.Karyawan:
        return "employee";
      case PeranPengguna.Admin:
        return "admin";
    }
  } else {
    switch (peran) {
      case PeranPengguna.Karyawan:
        return "karyawan";
      case PeranPengguna.Admin:
        return "admin";
    }
  }
}

export function stringToPeranPengguna(peranStr: string, bahasa: 'id' | 'en' = 'id'): PeranPengguna | null {
  if (bahasa === 'en') {
    switch (peranStr.toLowerCase()) {
      case "employee":
        return PeranPengguna.Karyawan;
      case "admin":
        return PeranPengguna.Admin;
      default:
        return null;
    }

  } else if (bahasa === 'id') {
    switch (peranStr.toLowerCase()) {
      case "karyawan":
        return PeranPengguna.Karyawan;
      case "admin":
        return PeranPengguna.Admin;
      default:
        return null;
    }
  } else {
    return null
  }
}

export function peranPenggunaToInt(peran: PeranPengguna): number {
  switch (peran) {
    case PeranPengguna.Karyawan:
      return 1;
    case PeranPengguna.Admin:
      return 2;
  }
}

export function intToPeranPengguna(value: number): PeranPengguna | null {
  switch (value) {
    case 1:
      return PeranPengguna.Karyawan;
    case 2:
      return PeranPengguna.Admin;
    default:
      return null;
  }
}