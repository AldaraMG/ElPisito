import { Injectable } from '@angular/core';
import { URL_BASE } from './global';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Credentials } from '../models/entity';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string=URL_BASE;
  token:any;

  constructor(
    private _http:HttpClient
  
  ) { }


  login(credenciales:Credentials):Observable<any>{
    console.log('Login initiated...');
    return this._http.post<any>(this.url + "authenticate", credenciales);
  }



  logout():void{
    console.log('Logout initiated...');
    if(localStorage.getItem("token")){

      localStorage.removeItem("token");
      console.log('Logout successful...');
            
    }

  }


  //ESTE MÉTODO CONTROLA SI EL USUARIO ESTÁ LOGUEADO (EXISTE TOKEN)
  //O NO ESTÁ LOGUEADO (NO EXISTE EL TOKEN O ESTÁ EXPIRADO)
  isLoggedIn():boolean{
    console.log('Checking if user is logged in...');
    const helper = new JwtHelperService();
    const token = this.getToken();

    //Primero comprobamos que el token exista
    if(!token){ //si no hay token no estamos logueados (no hace falta seguir)
      return false;
    }else{//Vamos a comprobar que el token no sea cualquier cadena

      try{

        helper.decodeToken(token);

      }catch(e){

        //Si se produce un error significa que el "token" no es un jwt por lo tanto retornamos false
        return false;
      }

      //Si el token no existe o no es un jwt no llegaríamos aquí porque el método hubiera return false

      //Ahora vamos a comprobar si el token está expirado
      const isExpired = helper.isTokenExpired(token);

      if(isExpired){

        this.logout(); // Si el token ha expirado, realiza el logout (lo borramos del mapa)

      }
      console.log('User is logged in:', !isExpired);

      return !isExpired;



    }

    
  }


/*   isLoggedIn2(): boolean {
    const helper = new JwtHelperService();
    const token = this.getToken();

    if (!token) {
      this.logout(); // Si no hay token, realiza el logout
      return false;
    } else {
      try {
        const isExpired = helper.isTokenExpired(token);
        if (isExpired) {
          this.logout(); // Si el token ha expirado, realiza el logout
        }
        return !isExpired;
      } catch (e) {
        this.logout(); // En caso de error, realiza el logout */




  getToken():string|null{

    return localStorage.getItem("token");

  }



  setTokenInLocalStorage(token:string):void{

    //Si existe otro token (caducado etc)...borralo!!!
    if(localStorage.getItem("token")){
      localStorage.removeItem("token");
    }

    //Una vez borrado seteamos el nuevo token
    localStorage.setItem("token",token);
    console.log('Token set in localStorage:', token);

  }


  // getUsuario():string{

  //   this.token = this.getToken();
  //   const helper = new JwtHelperService();
  //   const decodedToken = helper.decodeToken(this.token);
  //   return decodedToken.usuario;
  // }
  getUsuario(): string {
    this.token = this.getToken();
    const helper = new JwtHelperService();

    if (this.token) {
      try {
        const decodedToken = helper.decodeToken(this.token);

        if (decodedToken && decodedToken.usuario) {
          return decodedToken.usuario;
        } else {
          console.error('AuthService: No se pudo obtener el nombre de usuario del token.');
          return 'Usuario Desconocido';
        }
      } catch (e) {
        console.error('AuthService: Error al decodificar el token.', e);
        return 'Usuario Desconocido';
      }
    } else {
      console.error('AuthService: No se encontró un token de autenticación.');
      return 'Usuario No Autenticado';
    }
  }

  getRol():string{

    this.token = this.getToken();
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.token);
    let rol = decodedToken.ROLES;
    //console.log(decodedToken.ROLES); //Es un string tal que así "[ROLE_ADMIN]" (parece un array pero no lo es...)

    if(rol=="[ROLE_USER]"){
      rol = "user";
    }else if(rol=="[ROLE_ADMIN]"){
      rol = "admin";
    }

    console.log('Decoded roles:', decodedToken.ROLES);
    return rol;

  }
}
