import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments : ';
  assignments: Assignment[];

  // pour la pagination
  page=1;
  limit=10;
  prevPage;
  nextPage;
  totalDocs;
  totalPages;
  hasPrevPage;
  hasNextPage;

  // ici injection des services utilisés, en pas oublier "private"
  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit(): void {
    // appelée avant affichage du composant
    console.log(
      'Composant assignments, dans le ngOnInit, on demande aux service le tableau des assignments'
    );
    /*
    this.assignmentsService.getAssignments()
    .subscribe((assignments) => {
      console.log('Dans le subscribe...');
      this.assignments = assignments;
    }); */
    this.getAssignmentsPourAffichage();
  }

  getAssignmentsPourAffichage() {
    this.assignmentsService.getAssignmentsPagines(this.page, this.limit)
    .subscribe(data => {
      this.page = data["page"];
      this.prevPage = data["prevPage"];
      this.nextPage = data["nextPage"];
      this.totalDocs = data['totalDocs'];
      this.totalPages = data["totalPages"];
      this.hasPrevPage = data["hasPrevPage"];
      this.hasNextPage = data["hasNextPage"];
      console.log("count = " + this.totalDocs, " nbPages = " + this.totalPages);

      this.assignments = data["docs"];
    })
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignmentsPourAffichage()
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignmentsPourAffichage()
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignmentsPourAffichage()
  }

  premierePage() {
    this.page = 1;
    this.getAssignmentsPourAffichage()
  }
}
