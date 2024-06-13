import { Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { usuarioLogin } from '../../models/cliente.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, LoadingComponent, RouterModule, ReactiveFormsModule] 
})
export class LoginComponent {
  form!:FormGroup;
  loginEvent = new EventEmitter();
  constructor(private fb: FormBuilder,
    private authService: HttpService,
    private alert: AlertService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  loading:boolean = false;
  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const correo = this.form.value.email;
      const contra = this.form.value.password;
      var user:usuarioLogin;
      this.authService.login(correo, contra).subscribe(
        response => {
          if (response) {
            console.log(response)
            console.log('Login exitoso', response.data[0]);
              user ={
                id:response.data[0].id,
                Nombres: response.data[0].Nombres,
                ApPaterno: response.data[0].ApPaterno,
                ApMaterno: response.data[0].ApMaterno,
                tipo:response.data[0].Tipo,
                token:response.data[0].Token,
                Activo:true
              }
              console.log(user.tipo)
              if(user.tipo == 0){
                this.alert.danger("Error en el usuario o contraseña, por favor intentelo de nuevo");
                this.form.reset();
              }
              else if(user.tipo == 1){
                this.alert.success("Inicio de sesión correcto");
                var usrJSON = JSON.stringify(user)
                sessionStorage.setItem("usr",usrJSON)
                this.loginEvent.emit();
                this.router.navigateByUrl("/mapa")
              }
              else if(user.tipo == 2){
                this.alert.success("Inicio de sesión correcto");
                var usrJSON = JSON.stringify(user)
                sessionStorage.setItem("usr",usrJSON)
                this.loginEvent.emit();
                this.router.navigateByUrl("/")
              }else{
                this.alert.error("Ocurrio un error al iniciar sesión");
              }
              this.loading = false;
            // Manejar el éxito del login, por ejemplo, redirigir al dashboard
          } else {
            console.error('Error en login', response);
            // Manejar el error, por ejemplo, mostrar un mensaje de error
          }
        },
        error => {
          console.error('Error en la llamada al servidor', error);
          // Manejar el error, por ejemplo, mostrar un mensaje de error
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
 