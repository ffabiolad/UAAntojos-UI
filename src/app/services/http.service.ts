import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendedor } from '../models/vendedor.model';
import { ResponseObject } from '../models/response.model';
import { AlertService } from './alert.service';
import { usuarioLogin } from '../models/cliente.model';
import { Comercio } from '../models/comercio.model';
import { EdificioCampus } from '../models/edificioCampus.model';
import { Categoria } from '../models/categoria.model';
import { MetodoPago } from '../models/metodoPago.model';
import { Producto } from '../models/producto.model';
import { RegistroUsuarioModel } from '../models/registroUsuarioModel';
import { CrearDetallePedidoModel } from '../models/CrearDetallePedidoModel';
import { CrearPedidoModel } from '../models/crearPedidoModel';
import { Pedido } from '../models/pedido.model';
import { DetallePedido } from '../models/detallePedido.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL: string = "http://localhost:3000/api"

  constructor(
    private httpClient:HttpClient,
    private alertService:AlertService
  ) { }


  postRegisterUser( newUser : RegistroUsuarioModel ):Observable<ResponseObject<string>>{
    return this.httpClient.post<ResponseObject<string>>(this.baseURL+"/registro", newUser);
  }

  postCreateOrder( newOrder : CrearPedidoModel ):Observable<ResponseObject<string>>{
    return this.httpClient.post<ResponseObject<string>>(this.baseURL+"/pedido/crear", newOrder);
  }

  postCreateDetailOrder( newDetailOrder : CrearDetallePedidoModel ):Observable<ResponseObject<string>>{
    return this.httpClient.post<ResponseObject<string>>(this.baseURL+"/pedido/crear/detalles", newDetailOrder);
  }


  async getProductosActivos():Promise<Producto[]>{
    let vendedores: Producto[] = [];
    try{
      await (<Observable<ResponseObject<Producto[]>>> this.httpClient.get(this.baseURL + "/producto/activos"))
      .forEach(res => {
        if(res.success && typeof res.data == 'object'){
          vendedores = res.data;
        }else{
          this.alertService.error("Error al obtener los productos");
        }
      });
    }catch(err){
      console.error(err);
      
      //this.alertService.error(err);
    }
    return vendedores;
  }


  async getVendedores():Promise<Vendedor[]>{
    let vendedores: Vendedor[] = [];
    try{
      await (<Observable<ResponseObject<Vendedor[]>>> this.httpClient.get(this.baseURL + "/vendedor/activos"))
      .forEach(res => {
        if(res.success && typeof res.data == 'object'){
          vendedores = res.data;
        }else{
          this.alertService.error("Error al obtener los vendedores");
        }
      });
    }catch(err){
      console.error(err);
      
      //this.alertService.error(err);
    }
    return vendedores;
  }

  async getProductosPorVendedor(idComercio:number):Promise<Producto[]>{
    let producto: Producto[] = [];
    try{
      await (<Observable<ResponseObject<Producto[]>>> this.httpClient.get(this.baseURL + "/comercio/productos/" + idComercio))
      .forEach(res => {
        if(res.success && typeof res.data == 'object'){
          producto = res.data;
        }else{
          this.alertService.error("Error al obtener los productos por vendedor");
        }
      });
    }catch(err){
      console.error(err);
      //this.alertService.error(err);
    }
    return producto;
  }

  async getComercios():Promise<Comercio[]>{
    let comercio: Comercio[] = [];
    try{
      await (<Observable<ResponseObject<Comercio[]>>> this.httpClient.get(this.baseURL + "/comercio/activos"))
      .forEach(res => {
        if(res.success && typeof res.data == 'object'){
          comercio = res.data;
        }else{
          this.alertService.error("Error al obtener los comercios");
        }
      });
    }catch(err){
      console.error(err);
      //this.alertService.error(err);
    }
    return comercio;
  }

  async getEdificioComercio(idComercio:number):Promise<EdificioCampus>{
    let edifico: EdificioCampus = {idCampus: 0, IdCreador: 0, idEdificio: 0, E_Activos: false, Latitud: '', Longitud: '', Nombre: '', Numero: ''};
    try{
      await (<Observable<ResponseObject<EdificioCampus>>> this.httpClient.get(this.baseURL + "/comercio/edificio/"+idComercio))
      .forEach(res => {
        if(res.success && typeof res.data == 'object'){
          edifico = res.data;
        }else{
          this.alertService.error("Error al obtener el edificio");
        }
      });
    }catch(err){
      console.error(err);
      //this.alertService.error(err);
    }
    return edifico;
  }

  async getMetodoPago():Promise<MetodoPago[]>{
    let metodoPago: MetodoPago[] = [];
    try{
      await (<Observable<ResponseObject<MetodoPago[]>>> this.httpClient.get(this.baseURL + "/pedido/metodopago"))
      .forEach(res => {
        if(res.success && typeof res.data == 'object'){
          metodoPago = res.data;
        }else{
          this.alertService.error("Error al obtener los tipos de pago");
        }
      });
    }catch(err){
      console.error(err);
      //this.alertService.error(err);
    }
    return metodoPago;
  }

  async getCategorias():Promise<Categoria[]>{
    let categoria: Categoria[] = [];
    try{
      await (<Observable<ResponseObject<Categoria[]>>> this.httpClient.get(this.baseURL + "/producto/categorias"))
      .forEach(res => {
        if(res.success && typeof res.data == 'object'){
          categoria = res.data;
        }else{
          this.alertService.error("Error al obtener el edificio");
        }
      });
    }catch(err){
      console.error(err);
      //this.alertService.error(err);
    }
    return categoria;
  }

  async getPedidosCliente(id:number):Promise<Pedido[]>{
    let pedido: Pedido[] = [];
    try{
      await (<Observable<ResponseObject<Pedido[]>>> this.httpClient.get(this.baseURL + "/pedido/cliente/"+id))
      .forEach(res => {
        if(res.success && typeof res.data == 'object'){
          pedido = res.data;
        }else{
          this.alertService.error("Error al obtener los pedidos de cliente");
        }
      });
    }catch(err){
      console.error(err);
      //this.alertService.error(err);
    }
    return pedido;
   }
   async getPedidosVendedor(id:number):Promise<Pedido[]>{
    let pedido: Pedido[] = [];
    try{
      await (<Observable<ResponseObject<Pedido[]>>> this.httpClient.get(this.baseURL + "/pedido/comercio/"+id))
      .forEach(res => {
        if(res.success && typeof res.data == 'object'){
          pedido = res.data;
        }else{
          this.alertService.error("Error al obtener los pedidos del comercio");
        }
      });
    }catch(err){
      console.error(err);
      //this.alertService.error(err);
    }
    return pedido;
   }

   async getDetallePedido(id:number):Promise<DetallePedido[]>{
    let pedido: DetallePedido[] = [];
    try{
      await (<Observable<ResponseObject<DetallePedido[]>>> this.httpClient.get(this.baseURL + "/pedido/detalle/"+id))
      .forEach(res => {
        if(res.success && typeof res.data == 'object'){
          pedido = res.data;
        }else{
          this.alertService.error("Error al obtener los pedidos de cliente");
        }
      });
    }catch(err){
      console.error(err);
      //this.alertService.error(err);
    }
    return pedido;
   }

  

  login(correo:string, contra:string,token:string="token100%realnofake" ):Observable<any>{
    return this.httpClient.post<usuarioLogin>(this.baseURL+"/login", { correo, contra, token });
  }
}
