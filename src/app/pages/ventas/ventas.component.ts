import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { RouterModule } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AlertService } from '../../services/alert.service';
import { Pedido, PedidoCliente } from '../../models/pedido.model';
import Swal from 'sweetalert2';

interface Sale {
  id: number;
  product: string;
  date: string;
  amount: number;
  buyer: string;
}

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  standalone: true,
  imports: [CommonModule, LoadingComponent, RouterModule]
})
export class VentasComponent implements OnInit {
  isVendor: boolean = true; //    según sea necesario

  sales: Pedido[]= [
    ];

  constructor(private httpService:HttpService,private alert:AlertService) { }

  ngOnInit(): void { 
    this.getPedidos();
  }



  async getPedidos(){
    let usuario;
    if(sessionStorage.getItem("usr")){
      var usr = sessionStorage.getItem("usr");
      if(usr){
      usuario = JSON.parse(usr);
      console.log(usuario)}
      if(usuario.tipo == 1){
        this.isVendor = false;
        this.sales = await this.httpService.getPedidosCliente(usuario.id);
        console.log(this.sales)
      }
      if(usuario.tipo == 2){
        this.isVendor = true;
        this.sales = await this.httpService.getPedidosVendedor(usuario.id);
      }        

    }
    else{
      this.alert.error("No se tiene sesión iniciada")
    }

  }
  async getDetalle(id:number){
    let detalles = await this.httpService.getDetallePedido(id);
    let total = 0;
    console.log(detalles)
    let listaHTML = '<ul>';
    detalles.forEach(elemento => {
    listaHTML += `<li>${elemento.IdProducto} - ${elemento.Cantidad}*${elemento.Precio}</li>`;
    total = total+ elemento.Cantidad+elemento.Precio;
    });
    listaHTML += '</ul>';
    listaHTML += `<h3>Total: ${total}`;
    Swal.fire({
      title: `Detalles del pedido: ${id}`,
      html: listaHTML,
      icon: 'info',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      // Hacer algo después de que se confirma el SweetAlert
      if (result.isConfirmed) {
        console.log('SweetAlert confirmado');
      }
    });
  }
}
