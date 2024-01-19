import { Component } from '@angular/core';
import { Usuario } from '../../models/entity';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComunicationService } from '../../services/comunication.service';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css'
})
export class EditUsuarioComponent {

  nFases: number = 1;
  cargaCompletada: boolean = false;
  fasesCargadas: number = 0;
  id: number;
  usuario: Usuario = {
    email: '',
    password: '',
    user: '',
    activo: 0
  };
  rol: string;  // Asegúrate de declarar la propiedad 'rol' en tu componente

  registerForm = new FormGroup({
    elEmail: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]),
    elUsuario: new FormControl('', [Validators.required])
    
  });

  constructor(
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _comunicationService: ComunicationService,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this._comunicationService.cambioPortada(false);
    this._comunicationService.cambioFooter(false);
    this.getDatos();
  }

  getDatos(): void {
    this._route.params.subscribe({
      next: (params) => {
        this.id = params['id'];
      },
      error: (error) => {
        this._router.navigate(['/error']);
      }
    });

    this._usuarioService.getUsuario(this.id).subscribe({
      next: (datos) => {
        this.usuario.id = datos.id;
        this.usuario.email = datos.email;
        this.usuario.user = datos.user;

        this.registerForm.setValue({
          elEmail: this.usuario.email as string,  // Cambiar a tipo string
          elUsuario: this.usuario.user as string   // Cambiar a tipo string
        });
      },
      error: (error) => {
        this._router.navigate(['/error']);
      },
      complete: () => {
        this.faseCarga();
      }
    });
  }

  updateUsuario(): void {
    if (this.registerForm.valid) {
      const emailControl = this.registerForm.get('elEmail');
      const userControl = this.registerForm.get('elUsuario');
  
      // Verificar si los controles no son nulos antes de acceder a sus valores
      if (emailControl && userControl) {
        this.usuario.email = emailControl.value || '';
        this.usuario.user = userControl.value || '';
      this._usuarioService.updateUsuario(this.usuario).subscribe({
        next: (datos) => {
          console.log(datos);
        },
        error: (error) => {
          this._router.navigate(['/error']);
        },
        complete: () => {
          this.rol = this._authService.getRol();
          if (this.rol === 'admin') {
            this._router.navigate(['/list-usuario']);
          } else {
            this._router.navigate(['/home']);
          }
        }
      });
    }
  }
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

