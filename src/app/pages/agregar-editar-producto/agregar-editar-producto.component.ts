import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agregar-editar-producto',
  templateUrl: './agregar-editar-producto.component.html',
  styleUrls: ['./agregar-editar-producto.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule]
})
export class AgregarEditarProductoComponent implements OnInit {
  isEditMode = false; 
  producto = {
    nombre: '',
    descripcion: '',
    precio: null,
    categoria: '',
    imagen: ''
  };

  constructor() { }

  ngOnInit(): void {
   //pues si vdd
  }
}
