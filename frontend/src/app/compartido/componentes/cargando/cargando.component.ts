import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cargando',
  imports: [MatProgressSpinnerModule],
  templateUrl: './cargando.component.html',
  styleUrl: './cargando.component.scss'
})
export class CargandoComponent {
  mensaje = input<string>('Cargando...');
  diametro = input<number>(40);
}
