import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = '';
  clave: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  private loginFailedSubject = new BehaviorSubject(false);
  loginFailed$ = this.loginFailedSubject.asObservable();
  loginFailed: boolean;

  ngOnInit(): void {
    this.authService.loginFailed$.subscribe(loginFailed => this.loginFailed = loginFailed);
  }

  constructor() {}

  isLoading: boolean = false;
  async login(usuario: string,clave: string){

    this.isLoading = true;
    await this.authService.buscarBD4(usuario,clave);
    this.isLoading = false;

    this.authService.isAuthenticated$.subscribe(isAuthenticated => {

      this.authService.usuarioCompleto$.subscribe(usuarioCompleto => {
        if (isAuthenticated) {
          this.usuario = ''; 
          this.clave = ''; 

          if (usuarioCompleto != null && usuarioCompleto){
            if (usuarioCompleto.rol === "vendedor") {
              console.log('LOGIN: ' + usuarioCompleto.rol);
              this.usuario = ''; 
              this.clave = ''; 
              this.router.navigate(['/vendedor']); 
            }
            else{
              this.usuario = ''; 
              this.clave = ''; 
              this.router.navigate(['/cliente']); 
            }
          }

        } else {
          this.loginFailed = true; 
        }

      });

    });
  }

}
