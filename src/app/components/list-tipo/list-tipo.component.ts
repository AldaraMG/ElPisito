import { Component, OnInit } from '@angular/core';
import { Tipo } from '../../models/entity';
import { TipoService } from '../../services/tipo.service';
import { Router } from '@angular/router';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-list-tipo',
  templateUrl: './list-tipo.component.html',
  styleUrl: './list-tipo.component.css'
})
export class ListTipoComponent implements OnInit {

  /////////////////////////////////////////////////
  nFases:number=1;
  cargaCompletada:boolean=false;
  fasesCargadas:number=0;
  /////////////////////////////////////////////////

  aDatos:Tipo[]=[];

  constructor(
    private _tipoService:TipoService,
    private _router:Router,
    private _comunicationService:ComunicationService,
  ){}

  ngOnInit(): void {
    this._comunicationService.cambioPortada(false);
    this._comunicationService.cambioFooter(false);
    this.getDatos();
    
  }


  getDatos():void{

    this._tipoService.getTipos().subscribe({

      next: (datos)=>{ this.aDatos=datos }
      ,
      error: (error)=>{this._router.navigate(["/error"])}
      ,
      complete: ()=>{this.faseCarga()}


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
