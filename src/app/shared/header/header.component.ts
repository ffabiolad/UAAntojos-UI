import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { usuarioLogin } from '../../models/cliente.model';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class HeaderComponent implements OnInit{
  usuario!:usuarioLogin|null;
  @Input() evento!:Observable<any>;
  usrVendedor:boolean = true;
  usrCliente:boolean = true;
  usrActive: boolean = false;

  constructor(private router: Router,private alert:AlertService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }

  private eventSubscription!:Subscription;
  ngOnInit():void{
    this.eventSubscription = this.evento.subscribe(() => {
      this.obtenerSesion();
      this.verifyCart();
      this.verifyUsr();
    });
    this.obtenerSesion();
    this.verifyCart();
      this.verifyUsr();
  }

  obtenerSesion(){
    if(sessionStorage.getItem("usr")){
      var usr = sessionStorage.getItem("usr");
      if(usr){
      this.usuario = JSON.parse(usr);
      console.log(this.usuario)}
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      behavior: 'smooth'
    });
  }
  closeMenu(check: HTMLInputElement): void {
    this.scrollToTop();
    check.checked = false;
  }

  verifyCart(){
    if(this.usuario){
      if(this.usuario.tipo == 1){
        this.usrCliente = false
      }
      else{
        this.usrCliente = true
      }
    }
    else{
      this.usrCliente = true;
    }
  }
  verifyUsr(){
    if(this.usuario){
      if(this.usuario.tipo == 1 || this.usuario.tipo == 2){
        this.usrActive = false
      }
      else{
        this.usrActive = true
      }
    }
    else{
      this.usrActive = true;
    }
  }
  logout(){
    if(this.usuario){
      sessionStorage.removeItem("usr");
      this.alert.success("Se ha cerrado sesión exitosamente");
      this.usuario = null;
      this.verifyCart();
      this.verifyUsr();
      this.router.navigate(['/']);
    }
  }
}
