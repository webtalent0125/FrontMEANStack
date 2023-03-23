import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { data } from './assignmentsData';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  constructor(private loggingService:LoggingService,
              private http:HttpClient) { }

  uri = "http://localhost:8010/api/assignments";
  //  uri = "https://apiemsi2021.herokuapp.com/api/assignments";

  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignmentsPagines(page:number, limit:number):Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri+ "?page=" + page + "&limit=" + limit);
  }

  getAssignment(id:number):Observable<Assignment> {
    return this.http.get<Assignment>(this.uri + "/" + id)
    .pipe(
      tap(a => {
        console.log("Dans pipe/tap j'ai récupéré assignement nom = " +a.nom)
      }),
      map(a => {
        //a.nom += " ALTERE PAR LE MAP";
        return a;
      }),
      catchError(this.handleError<Assignment>("getAssignment avec id = " + id))
    );
  }

  private handleError<T>(operation, result?:T) {
    return(error:any):Observable<T> => {
      console.log(error); // pour afficher l'erreur dans la console
      console.log(operation + " a échoué " + error.message);

      return of(result as T);
    }
  }

  addAssignment(assignment:Assignment):Observable<any> {
    assignment.id = Math.floor(Math.random() * 100000);

    this.loggingService.log(assignment.nom, "ajouté")

    return this.http.post<Assignment>(this.uri, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // ici envoyer requête PUT à une base de données...
    this.loggingService.log(assignment.nom, "modifié")

    return this.http.put<Assignment>(this.uri, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    this.loggingService.log(assignment.nom, "supprimé");
    return this.http.delete(this.uri + "/" + assignment._id);
  }

  peuplerBaseAvecDonneesDeTest() {
    data.forEach(a => {
      let newAssignment = new Assignment();
      newAssignment.nom = a.nom;
      newAssignment.dateDeRendu = new Date(a.dateDeRendu);
      newAssignment.rendu = a.rendu;
      newAssignment.id = a.id;
      newAssignment.auteur = a.auteur;
      newAssignment.matiere = a.matiere;
      newAssignment.imageMatiere = a.imageMatiere;
      newAssignment.photoProf = a.photoProf;
      newAssignment.note = a.note;
      newAssignment.remarques = a.remarques;

      this.addAssignment(newAssignment)
      .subscribe(reponseObject => {
        console.log(reponseObject.message);
      })
    })
  }

  // autre version qui permet de récupérer un subscribe une fois que tous les inserts
  // ont été effectués
  peuplerBDJoin(): Observable<any> {
    const calls=[];

    data.forEach((a) => {
      const new_assignment = new Assignment();
      new_assignment.nom = a.nom;
      new_assignment.dateDeRendu = new Date(a.dateDeRendu);
      new_assignment.rendu = false;
      new_assignment.auteur = a.auteur;
      new_assignment.matiere = a.matiere;
      new_assignment.imageMatiere = a.imageMatiere;
      new_assignment.photoProf = a.photoProf;
      new_assignment.note = a.note;
      new_assignment.remarques = a.remarques;
      calls.push(this.addAssignment(new_assignment));
    });
    return forkJoin(calls); // renvoie un seul Observable pour dire que c'est fini
  }
}
