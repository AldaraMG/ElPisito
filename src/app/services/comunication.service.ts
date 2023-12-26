import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

//El objeto portada recibe como valor de inicialización false

portadaCarousel=new BehaviorSubject(true);
portada$=this.portadaCarousel.asObservable();
estadoFooter=new BehaviorSubject(true);
footer$=this.estadoFooter.asObservable();

  constructor() { }

cambioPortada(estado:boolean):void{
  this.portadaCarousel.next(estado);
}

cambioFooter(estado:boolean):void{
  this.estadoFooter.next(estado);
}



}
