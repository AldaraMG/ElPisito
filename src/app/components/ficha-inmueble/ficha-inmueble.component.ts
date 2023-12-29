import { Component, Input, OnInit } from '@angular/core';
import { Inmueble } from '../../models/entity';

@Component({
  selector: 'app-ficha-inmueble',
  templateUrl: './ficha-inmueble.component.html',
  styleUrl: './ficha-inmueble.component.css'
})
export class FichaInmuebleComponent  {
  @Input () datos:Inmueble;




}
