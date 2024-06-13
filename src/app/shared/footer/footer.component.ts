import { Component, Input } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { usuarioLogin } from '../../models/cliente.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class FooterComponent {
  usuario!:usuarioLogin|null;
  @Input() evento!:Observable<any>;
  
  usrVendedor:boolean = true;
  usrCliente:boolean = true;
  usrActive: boolean = false;
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
  constructor(private router: Router, private alert: AlertService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
