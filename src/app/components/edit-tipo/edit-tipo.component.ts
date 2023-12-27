import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipo } from '../../models/entity';
import { TipoService } from '../../services/tipo.service';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-edit-tipo',
  templateUrl: './edit-tipo.component.html',
  styleUrl: './edit-tipo.component.css'
})
export class EditTipoComponent implements OnInit {

   /////////////////////////////////////////////////
   nFases:number=1;
   cargaCompletada:boolean=false;
   fasesCargadas:number=0;
   /////////////////////////////////////////////////
 

  id:number;

  tipo:Tipo={

    id:0,
    nombre:"",
    activo:0
  }



  constructor(
    private _tipoService:TipoService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _comunicationService:ComunicationService
  ){}




  ngOnInit(): void {
    this._comunicationService.cambioPortada(false);
    this._comunicationService.cambioFooter(false);
    this.getDatos();
  }


  getDatos():void{

  
    //El primer dato que necesito es es id de la ruta, porque sin él no podemos
    //acceder a los atributos del abjeto a modificar
    this._route.params.subscribe({

      next:(params)=>{
        this.id=params['id'];    
      
      }
      ,
      error:(error)=>{this._router.navigate(["/error"])}
 
    });//NO TIENE COMPLETE


    //Ya tenemos el id. Con él llamamos a la API para conseguir los datos y poderlos mapear

    this._tipoService.getTipo(this.id).subscribe({

      next: (datos)=>{
        console.log(datos);
        
        //Mapeamos los datos en la interface tipo preparada para ello
        this.tipo.id= datos.id;
        this.tipo.nombre = datos.nombre;
        this.tipo.activo= datos.activo; //Asigna el 1 como true y el 0 como false
      }
      ,
      error: (error)=>{this._router.navigate(["/error"])}
      ,
      complete: ()=>{this.faseCarga();}

    });

  }

  edit():void{

    this.tipo.activo = Number(this.tipo.activo);
    this.tipo.nombre=this.tipo.nombre.toUpperCase();

    this._tipoService.updateTipo(this.tipo).subscribe({

      next: (datos)=>{console.log(datos)}
      ,
      error:(error)=>{this._router.navigate(["/error"])}
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