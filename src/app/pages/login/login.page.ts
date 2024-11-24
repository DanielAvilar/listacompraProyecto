import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firebase/auth.service';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { UtilsService } from 'src/app/firebase/utils.service'; // Importa el servicio del spinner

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
    private utilsService: UtilsService // Inyecta el servicio del spinner
  ) {
    this.error = '';
  }

  ngOnInit(): void {
    console.log('login');
  }

  goToLogin() {
    this.router.navigate(['/registrar']);
  }

  // Método para manejar el inicio de sesión
  async loginUser() {
    const loading = await this.utilsService.loading(); // Obtén el componente de loading
    await loading.present(); // Muestra el spinner

    try {
      const userCredential = await this.authService.login(this.email, this.password);
      const uid = userCredential?.user?.uid;
      if (!uid) {
        this.error = 'Error al obtener el UID del usuario.';
        return;
      }

      const userData = await this.firestoreService.getUser(uid);
      const rol = userData ? userData['rol'] : null;

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
      this.error = this.authService.GenerarError(error); // Asigna el mensaje de error
    } finally {
      await loading.dismiss(); // Oculta el spinner al finalizar
    }
  }
}