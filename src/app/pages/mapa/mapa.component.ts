import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { RouterModule } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { Vendedor } from '../../models/vendedor.model';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  standalone: true,
  imports: [CommonModule, LoadingComponent, RouterModule]
})
export class MapaComponent implements AfterViewInit{
  locationAccess = false;
  mapInitialized = false;
  vendedores:Vendedor[] = [];


  constructor(
    private httpService:HttpService
  ) { }

  ngAfterViewInit(): void {
    this.checkLocationAccess();
  }

  checkLocationAccess() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.locationAccess = true;
          this.mapInitialized = true;
          setTimeout(() => {
            this.initMap(position.coords.latitude, position.coords.longitude);
          }, 0);
        },
        (error) => {
          console.error('Error al acceder a la ubicación: ', error);
          alert('No se pudo acceder a la ubicación');
        }
      );
    } else {
      alert('La geolocalización no es compatible con este navegador.');
    }
  }

  async initMap(lat: number, lng: number) {
    this.vendedores = await this.httpService.getVendedores();
    console.log(this.vendedores);

    const map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/5860/5860579.png',
      iconSize: [38, 38], 
      iconAnchor: [19, 38], 
      popupAnchor: [0, -38] 
    });

    const customPin = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149059.png',
      iconSize: [38, 38], 
      iconAnchor: [19, 38], 
      popupAnchor: [0, -38] 
    });

    L.marker([lat, lng], { icon: customIcon }).addTo(map)
      .bindPopup('Estás aquí')
      .openPopup();

    sessionStorage.setItem('locacion', JSON.stringify({lat: lat, lng: lng}));

    for(let i = 1; i < this.vendedores.length; i++){
      L.marker([parseFloat(this.vendedores[i].Latitud), parseFloat(this.vendedores[i].Longitud)], { icon: customPin }).addTo(map)
      .bindPopup(
        `Vendedor: ${this.vendedores[i].Nombres} ${this.vendedores[i].ApPaterno}
          <br>
        Comercio: <a href='/productos/vendedor/${this.vendedores[i].IdComercio}'> ${this.vendedores[i].NombreComercio} </a>
        `
      );
    }
  }
}
