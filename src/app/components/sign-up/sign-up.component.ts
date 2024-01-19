import { Component } from '@angular/core';
import { Usuario } from '../../models/entity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  //Importa Reactiveformmodule.
  usuario:Usuario={
    email: '',
    password: '',
    user: '',
    activo: 0
  }; 

  registerForm = new FormGroup({

    elEmail: new FormControl('',[Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]) /* REGEX */
    ,
    elPassword: new FormControl('', [Validators.required])
    , 
    elUsuario: new FormControl('', [Validators.required])
    
  
  });

  constructor(

    private _router:Router,
    private _usuarioService:UsuarioService,
   
    
  ){}

  register():void{
    if(this.registerForm.valid){

      this.usuario.email=this.registerForm.get("elEmail")?.value|| "";
      this.usuario.password=this.registerForm.get("elPassword")?.value|| "";
      this.usuario.user=this.registerForm.get("elUsuario")?.value|| "";
    }

    this._usuarioService.addUsuario(this.usuario).subscribe({

      next:(datos)=>{
        console.log(datos);
      },
      error:(error)=>{
        this._router.navigate(['/error']);
      },
      complete:()=>{this._router.navigate(['/login']);
    }
    })
  }

}
