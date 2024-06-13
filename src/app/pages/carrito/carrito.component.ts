import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { MetodoPago } from '../../models/metodoPago.model';
import { CrearPedidoModel } from '../../models/crearPedidoModel';
import { Producto } from '../../models/producto.model';
import { CrearDetallePedidoModel } from '../../models/CrearDetallePedidoModel';

/*interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  vendedor: string;
  precio: number;
  cantidad: number;
}*/

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: Producto[] = [];
  total: number = 0;
  metodoPago:MetodoPago[] = [];
  tipoPago!:MetodoPago;

  public idPedido : number = 0;
  constructor(private httpClient:HttpService) { }

  ngOnInit(): void {
    this.cargarCarrito();
    this.calcularTotal();
    this.obtenerMetodoPago();
  }

  async obtenerMetodoPago(){
    this.metodoPago = await this.httpClient.getMetodoPago()
  }

  cargarCarrito(): void {
    this.carrito = JSON.parse(sessionStorage.getItem('cart') || '[]');
  }

  calcularTotal(): void {
    this.total = this.carrito.reduce((acc, producto) => acc + (producto.Precio * producto.cantidad), 0);
  }

  eliminarProducto(producto: Producto): void {
    this.carrito = this.carrito.filter(p => p.id !== producto.id);
    sessionStorage.setItem('cart', JSON.stringify(this.carrito));
    this.calcularTotal();
    Swal.fire({
      title: 'Producto eliminado',
      text: `${producto.Nombre} ha sido eliminado del carrito.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  vaciarCarrito(): void {
    this.carrito = [];
    sessionStorage.removeItem('cart');
    this.calcularTotal();
    Swal.fire({
      title: 'Carrito vaciado',
      text: 'Todos los productos han sido eliminados del carrito.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  cambiarPago(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    this.tipoPago = this.metodoPago[selectedIndex];
    console.log('Método de pago seleccionado:', this.tipoPago);
  }
  pagarCarritos(){
    let user
    let locData
    let token = 'token100%realnofake'
    let location = sessionStorage.getItem('locacion');
    let lat !: string;
    let lng !: string;
    let pedido : number;
    let dataUser = sessionStorage.getItem('usr');
    var crearPedido!: CrearPedidoModel;
    let idComercio !: number;
    let idCliente !: number;
    let Latitud !: string;    
    let carritoItem : CrearDetallePedidoModel;
    let lengthCarro : number = 0;
    if (location){
      locData = JSON.parse(location);
      lat = locData.lat;
      lng = locData.lng;
    }else{
      lat = '21.9419';
      lng = '-102.2756'
    }

    if (dataUser){
      user = JSON.parse(dataUser);
      idCliente = user.id;
      Latitud = user.Latitud
    }
    idComercio = this.carrito[0].IdComercio
    crearPedido = {
      IdCliente : idCliente,
      IdComercio : idComercio,
      IdMetodoPago : this.tipoPago.id,
      Latitud : lat,
      Longitud :lng,
      Token : token
    }
    
    this.httpClient.postCreateOrder(crearPedido).subscribe(response =>{
      pedido = +this.obtenerPedido(response.data);
      this.carrito.forEach( carro =>{
        carritoItem = {
          IdPedido : pedido,
          IdProducto : carro.id,
          Cantidad : carro.cantidad
        }
        this.httpClient.postCreateDetailOrder( carritoItem).subscribe(responseCarrito =>{
          lengthCarro++;
          if(lengthCarro == this.carrito.length){
            this.carrito = [];
            sessionStorage.removeItem('cart');
            this.calcularTotal();
            Swal.fire({
              title: 'Pedido Realizado',
              text: 'Se realizo un pedido con todos tu productos',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          }
        })
      })      
    })
  }

  obtenerPedido(cadena: string): string {
    const peidido = cadena.match(/\d+/g);
    return peidido ? peidido.join('') : '';
  }
}
