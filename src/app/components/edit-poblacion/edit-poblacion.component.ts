import { Component, OnInit } from '@angular/core';
import { PoblacionService } from '../../services/poblacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Poblacion, Provincia } from '../../models/entity';
import { ProvinciaService } from '../../services/provincia.service';

@Component({
  selector: 'app-edit-poblacion',
  templateUrl: './edit-poblacion.component.html',
  styleUrl: './edit-poblacion.component.css'
})
export class EditPoblacionComponent implements OnInit {


  /////////////////////////////////////////////////
  nFases:number=2;
  cargaCompletada:boolean=false;
  fasesCargadas:number=0;
  /////////////////////////////////////////////////

  id:number;

  aProvincias:Provincia[];

  poblacion:Poblacion={

    nombre:"",
    provincia:{
      id:0,
      nombre:"",
      activo:0
    },
    activo:1

  }

  constructor(
    private _poblacionService:PoblacionService,
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



    
    //Rellenar el select provincia con los datos de la BBDD
    this._provinciaService.getProvincias().subscribe({

      next: (datos)=>{this.aProvincias = datos}
      ,
      error: (error)=>{this._router.navigate(['/error'])}
      ,
      complete: ()=>{this.faseCarga()}

    });


    

    //Ya tenemos el id. Con él llamamos a la API para conseguir los datos y poderlos mapear
    this._poblacionService.getPoblacion(this.id).subscribe({

      next: (datos)=>{
  
        //Mapeamos los datos en la interface provincia preparada para ello
        this.poblacion.id= datos.id;
        this.poblacion.nombre = datos.nombre;
        this.poblacion.activo= datos.activo; //Asigna el 1 como true y el 0 como false
        this.poblacion.provincia.id = datos.provincia.id;
      }
      ,
      error: (error)=>{this._router.navigate(["/error"])}
      ,
      complete: ()=>{this.faseCarga();}

    });



  }


  edit():void{

    this.poblacion.activo = Number(this.poblacion.activo);
    this.poblacion.nombre = this.poblacion.nombre.toUpperCase();

    this._poblacionService.updatePoblacion(this.poblacion).subscribe({

      next: (datos)=>{console.log(datos)}
      ,
      error:(error)=>{this._router.navigate(["/error"])}
      ,
      complete: ()=>{this._router.navigate(["/list-poblacion"])}
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
