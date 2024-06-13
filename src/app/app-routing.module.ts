import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { MapaComponent } from './pages/mapa/mapa.component';
import { VendedoresComponent } from './pages/vendedores/vendedores.component';
import { VendedorComponent } from './pages/vendedor/vendedor.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { AgregarEditarProductoComponent } from './pages/agregar-editar-producto/agregar-editar-producto.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'vendedores', component: VendedoresComponent },
  { path: 'vendedor/:id', component: VendedorComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'editar-usuario', component: EditarUsuarioComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'agregar-editar-producto', component: AgregarEditarProductoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
