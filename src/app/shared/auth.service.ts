import { Injectable } from '@angular/core';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor() { }

  logIn() {
    // ici par exemple, on devrait prendre en parametre un login et un password
    // et vérifier qu'ils sont valables (par ex en interrogeant une BD ou un service distant)
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }

  isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.loggedIn)
    });
  };
}
