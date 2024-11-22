import { inject, Injectable } from '@angular/core';
import { User } from  '../models/user.models';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  constructor(private firestore: Firestore) {}

  // Método para crear un nuevo usuario en Firestore
  async createUser(uid: string, userData: { name: string; email: string; phone: string; rol: string }) {
    try {
      const userDocRef = doc(this.firestore, `Users/${uid}`);
      await setDoc(userDocRef, userData);
      console.log('Usuario creado correctamente:', uid);
    } catch (error) {
      console.error('Error al crear el usuario en Firestore:', error);
      throw error;
    }
  }

  // Método para obtener los datos de un usuario por su UID
  async getUser(uid: string) {
    try {
      const userDocRef = doc(this.firestore, `Users/${uid}`);
      console.log(`Consultando el documento con UID ${uid}`);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        console.log('Documento encontrado:', userDoc.data());
        return userDoc.data();
      } else {
        console.warn(`No se encontró ningún documento para el UID ${uid}`);
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el documento del usuario:', error);
      throw error;
    }
  }

}