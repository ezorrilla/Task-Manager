export class CorreoElectronico {
  private readonly valor: string;

  constructor(correo: string) {
    const correoNormalizado = correo.trim().toLowerCase();

    if (!this.esValido(correoNormalizado)) {
      throw new Error(`Correo electronico invalido: ${correo}`);
    }

    this.valor = correoNormalizado;
  }

  private esValido(correo: string): boolean {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(correo);
  }

  obtenerValor(): string {
    return this.valor;
  }

  esIgual(otro: CorreoElectronico): boolean {
    return this.valor === otro.obtenerValor();
  }
}
