import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, collectionData, addDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreObjectsService {
  constructor(private firestore: Firestore) {}

  // Método para obtener la referencia de la colección de listas de un usuario
  private getUserListsCollection(uid: string) {
    return collection(this.firestore, `Users/${uid}/lists`);
  }

  // Crear una nueva lista
  addList(uid: string, list: { name: string; createdAt: Date }): Promise<any> {
    const userListsCollection = this.getUserListsCollection(uid);
    return addDoc(userListsCollection, list);
  }

  // Obtener todas las listas del usuario
  getLists(uid: string): Observable<any[]> {
    const userListsCollection = this.getUserListsCollection(uid);
    return collectionData(userListsCollection, { idField: 'id' });
  }

  // Eliminar una lista
  deleteList(uid: string, listId: string): Promise<void> {
    const listDoc = doc(this.firestore, `Users/${uid}/lists/${listId}`);
    return deleteDoc(listDoc);
  }
}