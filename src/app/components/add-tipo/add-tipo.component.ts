import { Component, OnInit } from '@angular/core';
import { Tipo } from '../../models/entity';
import { TipoService } from '../../services/tipo.service';
import { Router } from '@angular/router';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-add-tipo',
  templateUrl: './add-tipo.component.html',
  styleUrl: './add-tipo.component.css'
})
export class AddTipoComponent implements OnInit{
    ///////////////////////////////////////////////// 
nFases:number=2; 
cargaCompletada:boolean=false;
fasesCargadas:number=0; 
///////////////////////////////////////////////// 

  constructor(
    private _tipoService:TipoService,
    private _router:Router,
    private _comunicationService:ComunicationService
  ){}
  ngOnInit(): void {
    this._comunicationService.cambioPortada(false);
    this._comunicationService.cambioFooter(false);
  }

  tipo:Tipo={
  
    nombre:'',
    activo:1
  }
  add():void{ 

console.log(this.tipo);

    this.tipo.nombre = this.tipo.nombre.toUpperCase(); 
    this._tipoService.addTipo(this.tipo).subscribe({ 
    
    next: (datos)=>{console.log(datos)} 
    , 
    error:(error)=>{console.log(error)}
    , 
    complete: ()=>{this._router.navigate(["/list-tipo"])} 
    
    
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
