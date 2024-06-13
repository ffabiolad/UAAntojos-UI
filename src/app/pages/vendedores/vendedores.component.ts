import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpService } from '../../services/http.service'
import { Comercio } from '../../models/comercio.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,  
  imports: [CommonModule, FormsModule],  
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.css'],
  
})
export class VendedoresComponent implements OnInit {

  comercios:Comercio[] = []
  comerciosFilter:Comercio[] = [];
  search:string = "";

  constructor(private httpService:HttpService,private router:Router) { }

  ngOnInit(): void {
    this.filtroComercios();
  }

  async filtroComercios(){
    await this.getComercios();
    this.comerciosFilter = [...this.comercios];
  }

  filter(){
    if(this.search == ""){
      this.comerciosFilter = [...this.comercios];
    }else{
      this.comerciosFilter = [...this.comercios].filter((a) => {
          var includesEdificio: boolean = false;
          if(a.Edificio){
            includesEdificio = (a.Edificio.Numero ? a.Edificio.Numero.includes(this.search) : false) || (a.Edificio.Nombre ? a.Edificio.Nombre.includes(this.search) : false);
          } 
          return a.NombreComercial.includes(this.search) || includesEdificio;
        }
      );
    }
  }

  verProductos(comercio:Comercio){
    this.router.navigateByUrl('/productos/vendedor/'+comercio.id);
  }

  async getComercios(){
    this.comercios = await this.httpService.getComercios();
    this.comercios.forEach(async (comercio) => {
      comercio.Edificio = await this.httpService.getEdificioComercio(comercio.id);      
    });
    console.log(this.comercios);
  }

}
