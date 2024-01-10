import { Component } from '@angular/core';
import { Credentials } from '../../models/entity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


credenciales:Credentials={

   username:'',//en realidad es el email.
   password:'' 
}; 

loginForm = new FormGroup({

  elEmail: new FormControl('',[Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]) /* REGEX */
  ,
  elPassword: new FormControl('', [Validators.required])

});
constructor(

  private _router:Router,
  private _authService:AuthService,
  
  private _comunicationService: ComunicationService,
){}




  login():void{
    if(this.loginForm.valid){

      this.credenciales.username=this.loginForm.get("elEmail")?.value|| "";
      this.credenciales.password=this.loginForm.get("elPassword")?.value|| "";
    }

    this._authService.login(this.credenciales).subscribe({

      next:(token)=>{
        this._authService.setTokenInLocalStorage(token.jwt);
        this._comunicationService.cambioLogueo(true);
      },
      error:(error)=>{
        this._router.navigate(['/error']);
      },
      complete:()=>{this._router.navigate(['/home']);
    }
    })
  }
}
