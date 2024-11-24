import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, collectionData, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreObjectsService {
  constructor(private firestore: Firestore) {}

  private getUserListsCollection(uid: string) {
    return collection(this.firestore, `Users/${uid}/lists`);
  }

  // Crear nueva lista
  addList(uid: string, list: { name: string; createdAt: Date }): Promise<any> {
    if (!uid) throw new Error('UID no definido.');
    return addDoc(this.getUserListsCollection(uid), list);
  }

  // Obtener listas del usuario
  getLists(uid: string): Observable<any[]> {
    if (!uid) throw new Error('UID no definido.');
    return collectionData(this.getUserListsCollection(uid), { idField: 'id' });
  }

  // Eliminar lista
  deleteList(uid: string, listId: string): Promise<void> {
    if (!uid || !listId) throw new Error('UID o List ID no definido.');
    const listDoc = doc(this.firestore, `Users/${uid}/lists/${listId}`);
    return deleteDoc(listDoc);
  }
}