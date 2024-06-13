import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule]
})
export class EditarUsuarioComponent {
  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: ''
  };
  confirmarContrasena = '';

  constructor() { }
}
