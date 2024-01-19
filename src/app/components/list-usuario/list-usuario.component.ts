import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/entity';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrl: './list-usuario.component.css'
})
export class ListUsuarioComponent implements OnInit {
    /////////////////////////////////////////////////
    nFases: number = 1;
    cargaCompletada: boolean = false;
    fasesCargadas: number = 0;
    /////////////////////////////////////////////////

    constructor(
      private _usuarioService:UsuarioService,
      private _router:Router,
      private _comunicationService:ComunicationService,
    ){}

  aDatos:Usuario[]=[];
  ngOnInit(): void {
    this._comunicationService.cambioPortada(false);
    this._comunicationService.cambioFooter(false);
    this.getDatos();
  }

  getDatos():void{

    this._usuarioService.getUsuarios().subscribe({

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


