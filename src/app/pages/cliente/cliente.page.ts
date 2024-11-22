import { Component, OnInit } from '@angular/core';
import { FirestoreObjectsService } from 'src/app/firebase/firestore.objects.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  objects: any[] = []; // Lista de objetos

  constructor(private firestoreObjectsService: FirestoreObjectsService) {}

  ngOnInit() {
    // Suscribirse a los cambios en la colección para obtener objetos en tiempo real
    this.firestoreObjectsService.getObjects().subscribe((data) => {
      this.objects = data;
    });
  }

  // Método para agregar un nuevo objeto
  addObject() {
    const newObject = {
      name: `Objeto ${this.objects.length + 1}`,
      createdAt: new Date(),
    };

    this.firestoreObjectsService.addObject(newObject).then(() => {
      console.log('Objeto agregado correctamente');
    }).catch((error) => {
      console.error('Error al agregar el objeto:', error);
    });
  }
}