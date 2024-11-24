import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/firebase/auth.service';
import { Router } from '@angular/router';
import { FirestoreObjectsService } from 'src/app/firebase/firestore.objects.service';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.page.html',
  styleUrls: ['./vendedor.page.scss'],
})
export class VendedorPage implements OnInit {
  products: any[] = []; // Lista de productos
  uid: string | null = null;

  constructor(
    private authService: AuthService,
    private firestoreObjectsService: FirestoreObjectsService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.uid) {
      this.uid = currentUser.uid;

      // Obtener productos en tiempo real (puedes usar una colección diferente para productos)
      this.firestoreObjectsService.getLists(this.uid).subscribe((data) => {
        this.products = data;
      });
    }
  }

  createProduct() {
    if (this.uid) {
      const newProduct = {
        name: `Producto ${this.products.length + 1}`,
        price: Math.floor(Math.random() * 1000), // Precio aleatorio
        createdAt: new Date(),
      };

      this.firestoreObjectsService.addList(this.uid, newProduct).then(() => {
        console.log('Producto creado correctamente');
      }).catch((error) => {
        console.error('Error al crear el producto:', error);
      });
    }
  }

  deleteProduct(productId: string) {
    if (this.uid) {
      this.firestoreObjectsService.deleteList(this.uid, productId).then(() => {
        console.log('Producto eliminado correctamente');
      }).catch((error) => {
        console.error('Error al eliminar el producto:', error);
      });
    }
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('Sesión cerrada correctamente');
      this.uid = null; // Limpiar el UID
      this.products = []; // Limpiar los productos
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}