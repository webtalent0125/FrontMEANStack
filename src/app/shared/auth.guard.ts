import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,
              private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true; // true = toujours autorisé

    return this.authService.isAdmin()
    .then(authentifie => {
      if(authentifie) {
        console.log("AuthGuard: NAVIGATION AUTORISEE");
        return true; // on autorisera la navigation
      } else {
        console.log("AuthGuard: NAVIGATION NON AUTORISEE");
        this.router.navigate(["/home"]); // on revient vers la page d'accueil
        return false; // on refuse la navigation
      }
    })
  }

}
