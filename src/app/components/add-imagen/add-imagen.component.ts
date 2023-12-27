import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComunicationService } from '../../services/comunication.service';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-imagen',
  templateUrl: './add-imagen.component.html',
  styleUrl: './add-imagen.component.css'
})
export class AddImagenComponent implements OnInit {

  @ViewChild('imagen') imagen:ElementRef;
  id:number;
  urlImagen:string;
  aImagenes:string[]=[];

  constructor(

    private _comunicationService:ComunicationService,
    private _storageService:StorageService,
    private _route:ActivatedRoute,
    private _router:Router
    
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
  }




  upload(e:any):void{

   const file = e.target.files[0];


    if(file){

      for( let file of e.target.files ){

        const formData = new FormData();
        formData.append('file',file);//'file' es MUY IMPORTANTE. El nombre de este parámetro tiene que coincidir con el que hemos definido en el end point de la API

        this._storageService.uploadFile( formData ,this.id).subscribe({

            next: (datos)=>{

              this.urlImagen = datos.url;
              this.aImagenes.push(this.urlImagen);

            }
            ,
            error: (error)=>{this._router.navigate(['/error'])}
            ,
            complete: ()=>{}


        });

      }//end for

      //Limpiamos el control #imagen por si lo queremos volver a utilizar
      this.imagen.nativeElement.value=null;


    }//end if
  

  }//end upload


}
