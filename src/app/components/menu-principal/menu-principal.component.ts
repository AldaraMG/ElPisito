import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComunicationService } from '../../services/comunication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent implements OnInit,OnDestroy{

suscripcion:Subscription;
  constructor( 
    private _comunicationService:ComunicationService,
    private _router:Router){
   
  }
  ngOnDestroy(): void {
    // this.suscripcion.unsubscribe();
  }
  ngOnInit(): void {

 /*   this.suscripcion = this._comunicationService.portada$.subscribe({
      next:(datos)=>{},
      error:(error)=>{},

      complete:()=>{}
    }); */
  }
administracion():void{
  this._comunicationService.cambioPortada(false);
  this._comunicationService.cambioFooter(false);
}



home():void{
  this._comunicationService.cambioPortada(true);
  this._comunicationService.cambioFooter(true);
}
}
