import { Injectable } from '@angular/core';
import { Usuario } from '../models/entity';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: string = GLOBAL.url
  constructor(
    private _http: HttpClient
  ) { }

  getUsuarios():Observable<Usuario[]>{

    return this._http.get<Usuario[]>(this.url + "usuarios");

  }

  getUsuario(id:number):Observable<Usuario>{

    return this._http.get<Usuario>(this.url + "usuario/" + id);
  }

  addUsuario(usuario: Usuario): Observable<Usuario> {

    return this._http.post<Usuario>(this.url + "usuario", usuario);
  }
  updateUsuario(usuario:Usuario):Observable<Usuario>{

    return this._http.put<Usuario>(this.url + "usuario",usuario)
  }
}
