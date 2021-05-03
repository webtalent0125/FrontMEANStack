import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre = "Application de gestion d'Assignments POUR HEROKU CETTE FOIS-CI !";

  constructor(private authService:AuthService,
              private router:Router,
              private assignmentsService:AssignmentsService) {}

  login() {
    if(this.authService.loggedIn) {
      this.authService.logOut();
      this.router.navigate(["/home"]);
    } else {
      this.authService.logIn();
    }
  }

  peuplerBD() {
    //this.assignmentsService.peuplerBaseAvecDonneesDeTest();
    this.assignmentsService.peuplerBDJoin()
       .subscribe((reponse) => {
         console.log("### BD PEUPLEE ! ###");
         // on navigue vers la page d'accueil pour afficher la liste
         this.router.navigate(["/home"]);
       })
  }
}
