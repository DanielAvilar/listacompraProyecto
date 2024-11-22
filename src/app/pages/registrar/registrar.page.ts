import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firebase/auth.service';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { User } from 'src/app/models/user.models';

@Component({
  selector: 'app-register',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

 // Creamos una variable de tipo User para almacenar los datos del formulario
 userData: User = {
  name: '',
  email: '',
  phone: '',
  rol: ''  
};

error: string = ''

password: string = '';

constructor(
  private authService: AuthService,
  private firestoreService: FirestoreService,
  private router: Router  // Para la redirección
) {
  this.error = '';
}
  ngOnInit(): void {
    console.log('register');
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }

// Método que se ejecutará al enviar el formulario de registro
async registerUser() {
  try {
    // Validar que todos los campos estén completos
    if (!this.userData.name || !this.userData.email || !this.userData.phone || !this.userData.rol || !this.password) {
      this.error = 'Por favor completa todos los campos.';
      return;
    }

    // Registrar el usuario en Firebase Authentication
    const userCredential = await this.authService.register(this.userData.email, this.password);

    // Obtener el UID del usuario registrado
    const uid = userCredential.user?.uid;

    // Almacenar los datos adicionales en Firestore
    if (uid) {
      const { name, email, phone, rol } = this.userData;

      // Crear el documento en Firestore
      await this.firestoreService.createUser(uid, { name, email, phone, rol });

      // Redirigir al usuario
      this.router.navigate(['/login']);
    }
  } catch (error) {
    console.error('Error registrando al usuario:', error);
    this.error = this.authService.GenerarError(error);
  }
}


}