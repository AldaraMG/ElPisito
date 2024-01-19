import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient } from '@angular/common/http';
import { Poblacion } from '../models/entity';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoblacionService {

   url:string=GLOBAL.url;
  constructor(

    private _http:HttpClient
  ) { }


  getPoblaciones():Observable<Poblacion[]>{

    return this._http.get<Poblacion[]>(this.url + "poblaciones");

  }

  
  getPoblacion(id: number): Observable<Poblacion> {
   
    return this._http.get<Poblacion>(this.url + "poblacion/" + id).pipe(
      tap((datos) => {
        console.log('Datos recibidos de getPoblacion:', datos);
      }),
      catchError((error) => {
        
        throw error; // Re-lanza el error para que se maneje en el componente
      })
    );
  }


  addPoblacion(poblacion:Poblacion):Observable<Poblacion>{

    return this._http.post<Poblacion>(this.url + "poblacion",poblacion);
  }


  updatePoblacion(poblacion:Poblacion):Observable<Poblacion>{

    return this._http.put<Poblacion>(this.url + "poblacion",poblacion)
  }
}
