import { Component, Input, Renderer2, } from '@angular/core';
import { GLOBAL } from '../../services/global';




@Component({
  selector: 'app-carousel-ficha',
  templateUrl: './carousel-ficha.component.html',
  styleUrl: './carousel-ficha.component.css'
})
export class CarouselFichaComponent  {

  @Input() datosCarousel:any;
url:string=GLOBAL.url_imagen;

constructor(private renderer: Renderer2) {}

detenerIntervalo(idCarrusel: string) {
  const carrusel = document.getElementById(idCarrusel);
  if (carrusel) {
    this.renderer.setProperty(carrusel, 'interval', false);
  }
}




}
