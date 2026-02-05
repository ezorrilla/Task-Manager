import { Directive, ElementRef, input, effect } from '@angular/core';

@Directive({
  selector: '[appHighlightCompleted]',
  standalone: true
})
export class HighlightCompletedDirective {
  completada = input.required<boolean>({ alias: 'appHighlightCompleted' });

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
