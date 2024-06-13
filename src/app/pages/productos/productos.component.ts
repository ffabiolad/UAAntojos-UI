import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';
import { HttpService } from '../../services/http.service';
import { Vendedor } from '../../models/vendedor.model';
import { Producto } from '../../models/producto.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comercio } from '../../models/comercio.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductosComponent implements OnInit {
  /*productos: Producto[] = [
    { id: 1, nombre: 'Pan', descripcion: 'Pan fresco de la panadería.', categoria: 'Alimentos', vendedor: 'Panadería La Esperanza', precio: 30, cantidad: 1 },
    { id: 2, nombre: 'Manzanas', descripcion: 'Manzanas frescas y jugosas.', categoria: 'Frutas', vendedor: 'Frutería El Paraíso', precio: 50, cantidad: 1 },
    { id: 3, nombre: 'Carne', descripcion: 'Carne de res de primera calidad.', categoria: 'Carnes', vendedor: 'Carnicería Don Juan', precio: 100, cantidad: 1 },
    { id: 4, nombre: 'Pescado', descripcion: 'Pescado fresco del día.', categoria: 'Pescados', vendedor: 'Pescadería La Ola', precio: 80, cantidad: 1 },
    { id: 5, nombre: 'Lechuga', descripcion: 'Lechuga fresca y crujiente.', categoria: 'Verduras', vendedor: 'Verdulería San José', precio: 20, cantidad: 1 },
    { id: 6, nombre: 'Arroz', descripcion: 'Arroz de grano largo.', categoria: 'Granos', vendedor: 'Tienda de Abarrotes Doña Rosa', precio: 25, cantidad: 1 },
  ];*/

  

  criterioOrdenacion = 'categoria';
  valorOrdenacion = '';
  valores: string[] = [];
  productosFiltrados: Producto[] = [];
  subParams:Subscription|undefined;
  idComercio:number = 0;

  constructor(private httpService:HttpService,private route:ActivatedRoute) {
   }

  initial:boolean = true;
  async ngOnInit() {
    this.subParams = this.route.params.subscribe(async params => {
      console.log(params)
      this.idComercio = params['idVendedor'] ? +params['idVendedor'] : 0
    })
    await this.getCategorias();
    await this.getVendedores();
    await this.getProductos();
    this.actualizarValores();
    this.ordenarProductos();
  }

  categorias:Categoria[] = [];
  async getCategorias(){
    this.categorias = await this.httpService.getCategorias();
  }

  productos:Producto[] = [];
  async getProductos(){
    this.productos = await this.httpService.getProductosActivos();
    this.productos.forEach(prod => {
      prod.cantidad = 0;
    });
  }

  comercios:Comercio[] = [];
  async getVendedores(){
    this.comercios = await this.httpService.getComercios();
  }

  async actualizarValores() {
    if(this.idComercio != 0 && this.initial){
      this.criterioOrdenacion = 'vendedor';
    }
    if (this.criterioOrdenacion === 'categoria') {
      this.valores = [...new Set(this.categorias.map(p => p.Nombre))];
      console.log(this.valores)
    } else if (this.criterioOrdenacion === 'vendedor') {
      this.valores = [...new Set(this.comercios.map(p => p.NombreComercial))];
    }
    this.valorOrdenacion = this.valores[0];
    if(this.idComercio != 0 && this.initial){
      console.log(this.idComercio)
      let comercio = this.comercios.find(a => a.id == this.idComercio);
      console.log(comercio)
      if(comercio) this.valorOrdenacion = comercio.NombreComercial;
      
    }
    this.initial = false;
    console.log(this.valorOrdenacion)
    this.ordenarProductos();
  }

  ordenarProductos() {
    if (this.criterioOrdenacion === 'categoria') {
      this.productosFiltrados = this.productos.filter(p => p.Categoria_idCategoria === this.categorias.find(a=> a.Nombre == this.valorOrdenacion)?.id);
    } else if (this.criterioOrdenacion === 'vendedor') {
      this.productosFiltrados = this.productos.filter(p => p.IdComercio === this.comercios.find(a=> a.NombreComercial == this.valorOrdenacion)?.id);
    }
  }

  anadirAlCarrito(producto: Producto): void {
    let cart: Producto[] = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const index = cart.findIndex(p => p.id === producto.id);

    if (index !== -1) {
      cart[index].cantidad += 1;
    } else {
      producto.cantidad = 1;
      cart.push({ ...producto });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    Swal.fire({
      title: '¡Añadido!',
      text: `${producto.Nombre} ha sido añadido al carrito.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
}

/*interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  vendedor: string;
  precio: number;
  cantidad: number;
}*/
