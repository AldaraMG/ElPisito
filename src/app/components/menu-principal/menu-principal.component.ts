import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComunicationService } from '../../services/comunication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent implements OnInit, OnDestroy {

  isLogged:boolean;
  suscripcion:Subscription;
  usuario:string;
  rol:string;

  constructor(
    private _comunicationService:ComunicationService,
    private _router:Router,
    private _authService:AuthService
  ){}


  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }


  ngOnInit(): void {

    this.suscripcion = this._comunicationService.logueo$.subscribe({

      next: (info)=>{

        this.isLogged = info;

        if(this.isLogged){
          this.usuario = this._authService.getUsuario();
          this.rol = this._authService.getRol();
        }

      }
      ,
      error: (error)=>{this._router.navigate(['/error'])}
      ,
      complete: ()=>{}


    });
    
  }



  logout():void{

    //this.isLogged=false; //No hace falta ya que lo actualiza el Observable
    this._authService.logout();
    //this._communicationService.cambioLogueo(false);//Tengo que comunicarlo a nivel general
    this._router.navigate(["/login"]);
    
  }




}