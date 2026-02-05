import { Directive, ElementRef, input, effect } from '@angular/core';

@Directive({
  selector: '[appResaltarCompletada]',
  standalone: true
})
export class ResaltarCompletadaDirectiva {
  completada = input.required<boolean>({ alias: 'appResaltarCompletada' });

  constructor(private elemento: ElementRef<HTMLElement>) {
    effect(() => {
      if (this.completada()) {
        this.elemento.nativeElement.style.opacity = '0.6';
        this.elemento.nativeElement.style.textDecoration = 'line-through';
      } else {
        this.elemento.nativeElement.style.opacity = '1';
        this.elemento.nativeElement.style.textDecoration = 'none';
      }
    });
  }
}
