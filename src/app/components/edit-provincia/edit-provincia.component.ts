import { Component, OnInit } from '@angular/core';
import { Provincia } from '../../models/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvinciaService } from '../../services/provincia.service';

@Component({
  selector: 'app-edit-provincia',
  templateUrl: './edit-provincia.component.html',
  styleUrl: './edit-provincia.component.css'
})
export class EditProvinciaComponent implements OnInit {


   /////////////////////////////////////////////////
   nFases:number=1;
   cargaCompletada:boolean=false;
   fasesCargadas:number=0;
   /////////////////////////////////////////////////
 
  id:number;

  provincia:Provincia={

    id:0,
    nombre:"",
    activo:0
  }



  constructor(
    private _provinciaService:ProvinciaService,
    private _route:ActivatedRoute,
    private _router:Router
  ){}




  ngOnInit(): void {
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

    this._provinciaService.getProvincia(this.id).subscribe({

      next: (datos)=>{
  
        
        //Mapeamos los datos en la interface provincia preparada para ello
        this.provincia.id= datos.id;
        this.provincia.nombre = datos.nombre;
        this.provincia.activo= datos.activo; //Asigna el 1 como true y el 0 como false
      }
      ,
      error: (error)=>{this._router.navigate(["/error"])}
      ,
      complete: ()=>{this.faseCarga();}

    });


  }

  edit():void{

    this.provincia.activo = Number(this.provincia.activo);
    this.provincia.nombre = this.provincia.nombre.toUpperCase();

    this._provinciaService.updateProvincia(this.provincia).subscribe({

      next: (datos)=>{console.log(datos)}
      ,
      error:(error)=>{this._router.navigate(["/error"])}
      ,
      complete: ()=>{this._router.navigate(["/list-provincia"])}
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
