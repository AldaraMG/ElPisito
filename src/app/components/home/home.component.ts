import { Component, OnInit } from '@angular/core';
import { ComunicationService } from '../../services/comunication.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  suscripcion:Subscription;
  isLogged:boolean;
  usuario:string;
  rol:string;

  constructor(
    private _comunicationService:ComunicationService,
    private _authService:AuthService,
    private _router:Router
  ){  }

  ngOnInit(): void {

    this.suscripcion = this._comunicationService.logueo$.subscribe({

      next: (info)=>{

        this.isLogged = info;

        if(this.isLogged){
          this.usuario = this._authService.getUsuario();
          this.rol = this._authService.getRol();
        }else{

          this.usuario="";
          this.rol="";
        }

      }
      ,
      error: (error)=>{this._router.navigate(['/error'])}
      ,
      complete: ()=>{}

    });

    this._comunicationService.cambioPortada(true);
    this._comunicationService.cambioFooter(true);
    
  }


  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

}
