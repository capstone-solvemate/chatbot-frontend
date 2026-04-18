export class LoginDto {
  constructor(
    public email: string,
    public password: string,
  ) { }

  toPlainObj(): Record<string, any> {
    return {
      email: this.email,
      password: this.password
    }
  }
}
