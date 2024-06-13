import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { RouterModule } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { Producto } from '../../models/producto.model';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css'],
  standalone: true,
  imports: [CommonModule, LoadingComponent, RouterModule]
})
export class VendedorComponent implements OnInit {
  vendorId: number = 0;
  isLoading: boolean = true; // Añadir esta línea
  products: Product[] = [
    { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: 100.00 },
    { id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: 150.00 },
    { id: 3, name: 'Producto 3', description: 'Descripción del producto 3', price: 200.00 }
  ];

  constructor(private route: ActivatedRoute, private httpService:HttpService) {
      
   }

  ngOnInit(): void {
    this.vendorId = +this.route.snapshot.paramMap.get('id')!;
   
    this.isLoading = false; 
  }

  productosVendedor:Producto[] = [];
  
  async getProductosDeVendedor(){
    this.productosVendedor = await this.httpService.getProductosPorVendedor(this.vendorId);
  }
}
