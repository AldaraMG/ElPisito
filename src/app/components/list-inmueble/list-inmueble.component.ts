import { Component, OnInit } from '@angular/core';
import { Inmueble } from '../../models/entity';
import { InmuebleService } from '../../services/inmueble.service';
import { Router } from '@angular/router';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-list-inmueble',
  templateUrl: './list-inmueble.component.html',
  styleUrl: './list-inmueble.component.css'
})
export class ListInmuebleComponent implements OnInit {
  /////////////////////////////////////////////////
  nFases:number=1;
  cargaCompletada:boolean=false;
  fasesCargadas:number=0;
  /////////////////////////////////////////////////

  aDatos:Inmueble[]=[];

  constructor(
    private _inmuebleService:InmuebleService,
    private _router:Router,
    private _comunicationService:ComunicationService,
   
  ){}

  ngOnInit(): void {
    this._comunicationService.cambioPortada(false);
    this._comunicationService.cambioFooter(false);
    this.getDatos();
    
  }


  getDatos():void{

    this._inmuebleService.getInmuebles().subscribe({

      next: (datos)=>{ 
        
        this.aDatos=datos; 
        
        for(let dato of this.aDatos){
          dato.direccionCompleta = `${dato.via} ${dato.nombreVia} ${dato.numero} ${dato.planta}${dato.puerta}`;
        }
        console.log(this.aDatos);
      }
      ,
      error: (error)=>{this._router.navigate(['/error'])}
      ,
      complete: ()=>{this.faseCarga();}


    });

  }


////////////////////////////////////////////////
faseCarga():void{

  this.fasesCargadas++;
  if(this.fasesCargadas == this.nFases){
    this.cargaCompletada = true;
  }

}
////////////////////////////////////////////////

}
