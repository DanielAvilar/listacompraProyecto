import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../firebase/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      // Usuario autenticado, permitir acceso
      return true;
    } else {
      // Usuario no autenticado, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}