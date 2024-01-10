import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

//El objeto portada (que es un BehaviourSubject ) recibe como valor de inicialización
  //false...
  portadaCarousel = new BehaviorSubject(true);
  portada$ = this.portadaCarousel.asObservable();

  estadoFooter = new BehaviorSubject(true);
  footer$ = this.estadoFooter.asObservable();

  logueo = new BehaviorSubject(this._authService.isLoggedIn());
  logueo$ = this.logueo.asObservable();

  constructor(
    private _authService:AuthService
  ) { }

  /* Este método será llamado por el componente que desee enviar la información 
  mandando el dato (estado).
  El BehaviourSubject "portada" mediante su método next enviará  información "fresquita"
  a todos los subscriptores del observable "portada$" */
  
  cambioPortada(estado:boolean):void{

    this.portadaCarousel.next(estado);
  }

  

  cambioFooter(estado:boolean):void{

    this.estadoFooter.next(estado);
  }


  cambioLogueo(estado:boolean):void{

    this.logueo.next(estado);
  }
}
