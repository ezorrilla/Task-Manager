import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaRelativa',
  standalone: true
})
export class FechaRelativaPipe implements PipeTransform {
  transform(fecha: string | Date): string {
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    const ahora = new Date();
    const diferencia = ahora.getTime() - fechaObj.getTime();

    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30);

    if (segundos < 60) {
      return 'Hace un momento';
    }

    if (minutos < 60) {
      return minutos === 1 ? 'Hace 1 minuto' : `Hace ${minutos} minutos`;
    }

    if (horas < 24) {
      return horas === 1 ? 'Hace 1 hora' : `Hace ${horas} horas`;
    }

    if (dias < 7) {
      return dias === 1 ? 'Hace 1 dia' : `Hace ${dias} dias`;
    }

    if (semanas < 4) {
      return semanas === 1 ? 'Hace 1 semana' : `Hace ${semanas} semanas`;
    }

    if (meses < 12) {
      return meses === 1 ? 'Hace 1 mes' : `Hace ${meses} meses`;
    }

    return fechaObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
