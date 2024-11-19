import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firebase/auth.service';
import { FirestoreService } from 'src/app/firebase/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

// Variables para almacenar el email y la contraseña del formulario
email: string = '';
password: string = '';

error: string = '';

constructor(private authService: AuthService, private firestoreService: FirestoreService, private router: Router) {
 this.error = '';
}
  ngOnInit(): void {
    console.log('login');
  }

// Método para manejar el inicio de sesión
async loginUser() {
  try {
    // Iniciar sesión
    const userCredential = await this.authService.login(this.email, this.password);

    // Obtener el UID del usuario autenticado
    const uid = userCredential.user?.uid;

    // Obtener el rol del usuario desde Firestore
    const userData = await this.firestoreService.getUser(uid);
    const rol = userData ? userData['rol'] : null;

    // Redirigir según el rol
    if (rol === 'cliente') {
      this.router.navigate(['/cliente']);
    } else if (rol === 'vendedor') {
      this.router.navigate(['/vendedor']);
    } else {
      console.error('Rol desconocido:', rol);
      this.error = 'Rol no definido';
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    this.error = this.authService.GenerarError(error);  // Asignar el mensaje de error
  }
}
}