import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreObjectsService {
  private objectsCollection;

  constructor(private firestore: Firestore) {
    this.objectsCollection = collection(this.firestore, 'objects'); // Colección 'objects'
  }

  // Método para agregar un objeto a la colección
  addObject(data: any): Promise<any> {
    return addDoc(this.objectsCollection, data); // Agrega un documento a Firestore
  }

  // Método para obtener todos los objetos como un observable
  getObjects(): Observable<any[]> {
    return collectionData(this.objectsCollection, { idField: 'id' }); // Escucha cambios en tiempo real
  }
}