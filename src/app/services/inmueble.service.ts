import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient } from '@angular/common/http';
import { Inmueble } from '../models/entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {


  url:string=GLOBAL.url;
  constructor(

    private _http:HttpClient
  ) { }

 
  /*PARA ADMINISTRACIÓN */
  getInmuebles():Observable<Inmueble[]>{

    return this._http.get<Inmueble[]>(this.url + "inmuebles");

  }

  /*PARA LA PORTADA*/
  getInmueblesPortada():Observable<Inmueble[]>{

    return this._http.get<Inmueble[]>(this.url + "inmuebles-portada");

  }

  /*PARA LA VENTA*/
  getInmueblesActivos():Observable<Inmueble[]>{

    return this._http.get<Inmueble[]>(this.url + "inmuebles-activos");

  }


  /*PARA LA VENTA DESDE EL BUSCADOR*/
  getInmueblesFinder(tipo:number, poblacion:number, operacion:string):Observable<Inmueble[]>{

    return this._http.get<Inmueble[]>(this.url + "inmuebles/" + tipo + "/" + poblacion + "/" + operacion);
  }




  getInmueble(id:number):Observable<Inmueble>{

    return this._http.get<Inmueble>(this.url + "inmueble/" + id);
  }


  addInmueble(inmueble:Inmueble):Observable<Inmueble>{

    return this._http.post<Inmueble>(this.url + "inmueble",inmueble);
  }


  updateInmueble(inmueble:Inmueble):Observable<Inmueble>{

    return this._http.put<Inmueble>(this.url + "inmueble",inmueble)
  }
}
