import { Component, OnInit } from '@angular/core';
import { FirestoreObjectsService } from 'src/app/firebase/firestore.objects.service';
import { AuthService } from 'src/app/firebase/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  lists: any[] = []; // Listas del usuario
  uid: string | null = null;

  constructor(
    private firestoreObjectsService: FirestoreObjectsService,
    private authService: AuthService,
    private router: Router // Agregar el Router aquí
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.uid) {
      this.uid = currentUser.uid;
      this.cargarListas(); // Método separado para cargar las listas
    } else {
      console.error('Usuario no autenticado');
      this.authService.logout(); // Forzar cierre de sesión si no hay usuario
    }
  }

  cargarListas() {
    if (!this.uid) return;
    this.firestoreObjectsService.getLists(this.uid).subscribe({
      next: (data) => {
        this.lists = data;
      },
      error: (error) => {
        console.error('Error al cargar listas:', error);
      },
    });
  }
  // Método para agregar una nueva lista
  addList() {
    if (this.uid) {
      console.log('UID del usuario:', this.uid); // Verifica que el UID sea correcto
      const newList = {
        name: `Lista ${this.lists.length + 1}`,
        createdAt: new Date(),
      };
  
      this.firestoreObjectsService.addList(this.uid, newList).then(() => {
        console.log('Lista agregada correctamente');
      }).catch((error) => {
        console.error('Error al agregar la lista:', error);
      });
    } else {
      console.error('UID no disponible. El usuario no está autenticado.');
    }
  }
  // Método para eliminar una lista
  deleteList(listId: string) {
    if (this.uid) {
      this.firestoreObjectsService.deleteList(this.uid, listId).then(() => {
        console.log('Lista eliminada correctamente');
      }).catch((error) => {
        console.error('Error al eliminar la lista:', error);
      });
    }
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('Sesión cerrada correctamente');
      this.uid = null; // Limpiar el UID
      this.lists = []; // Limpiar las listas
      // Redirigir al usuario al inicio de sesión
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
  
}