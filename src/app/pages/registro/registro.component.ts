import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroUsuarioModel } from '../../models/registroUsuarioModel';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegistroComponent {
  role: 'vendedor' | 'cliente' | null = null;
  registroData = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    contrasena: ''
  };
  confirmarContrasena = '';
  passwordMismatch = false;
  public newUser !: RegistroUsuarioModel;
  public type : number = 1;

  constructor(private httpClient:HttpService,
    private router : Router
  ) {
       
  }

  selectRole(role: 'vendedor' | 'cliente') {
    this.role = role;
    if (role == 'vendedor'){
      this.type = 2;
    }else{
      this.type = 1;
    }
  }

  onSubmit() {

    if (this.registroData.contrasena !== this.confirmarContrasena) {
      this.passwordMismatch = true;
      return;
    }
    this.passwordMismatch = false;
    this.newUser = {
      nombres : this.registroData.nombre,
      apPaterno : this.registroData.apellidoPaterno,
      apMaterno : this.registroData.apellidoMaterno,
      correo    : this.registroData.correo,
      contra : this.registroData.contrasena,
      tipo : this.type
    }
    // console.log(this.newUser);
    this.httpClient.postRegisterUser(this.newUser).subscribe(response =>{
      if(response.success){
        Swal.fire({
          title: 'Registro exitoso',
          text: response.data,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/login']);
      }else{
        Swal.fire({
          title: 'Error en el registro',
          text: response.data,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })
    // logica para poder enviar datos a un server
    // console.log('Datos de registro:', this.registroData);
  }
}
