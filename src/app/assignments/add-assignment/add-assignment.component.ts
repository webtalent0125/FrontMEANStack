import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment, AssignmentSubject } from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // pour le formulaire
  nomAssignment = '';
  dateDeRendu = '';
  auteur ='';
  matiereProfs : AssignmentSubject[];
  matiereSelectionnee : AssignmentSubject;


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private assignmentsService:AssignmentsService,
              private router:Router,
              private _formBuilder: FormBuilder) {

                this.matiereProfs = [
                  {matiere: "Programmation Web", imageMatiere:"https://www.enukesoftware.com/blog/wp-content/uploads/2016/10/meanjs-1024x492-1024x575.jpg", nomProf: "Michel Buffa", photoProf:"https://i1.rgstatic.net/ii/profile.image/712495153029121-1546883490651_Q512/Michel-Buffa.jpg"},
                  {matiere: "Securite des SI", imageMatiere:"https://www.yokogawa.com/eu/blog/oil-gas/app/uploads/2020/04/116137226_s-1440x564_c.jpg", nomProf: "Remi Esclangon", photoProf:"https://c1.10times.com/company/1580891249/369465e3a7c71c73aa.png"},
                  {matiere: "Gestion de projets", imageMatiere:"https://specials-images.forbesimg.com/imageserve/5f5a2d56d0844debd57de789/960x0.jpg?fit=scale", nomProf: "Michel Winter", photoProf:"https://image-uviadeo.journaldunet.com/image/450/1513213475/37287.jpg"},
                  {matiere: "ERP", imageMatiere:"https://www.choisirmonerp.com/Content/images/rubrics/fr-FR/erp-definition-2.png", nomProf: "Yossi Gal", photoProf:"http://miageprojet2.unice.fr/@api/deki/files/1353/=YossiGal.jpg?size=thumb"},
                  {matiere: "SCRUM/AGILE", imageMatiere:"https://img-0.journaldunet.com/zUEeQr1IIsqVIibuDl4WQ-AIS-8=/1280x/smart/c50c46058ce74040a853bfb412e471af/ccmcms-jdn/15440567.jpg", nomProf: "Pascal Bohn", photoProf:"https://i.imgur.com/xH3KBVq.png"},
                  {matiere: "JEE", imageMatiere:"https://jakarta.ee/images/jakarta/jakarta_ee_400x400.png", nomProf: "Richard Grin", photoProf:"https://i.imgur.com/fLhToni.png"},
                ];

                this.matiereSelectionnee = this.matiereProfs[0];
              }

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  onSubmit() {
    let nouvelAssignment = new Assignment();
    if(!this.nomAssignment) return;
    if(!this.dateDeRendu) return;
    nouvelAssignment.auteur = this.auteur;
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = new Date(this.dateDeRendu);
    nouvelAssignment.rendu = false;

    nouvelAssignment.matiere = this.matiereSelectionnee.matiere;
    nouvelAssignment.imageMatiere = this.matiereSelectionnee.imageMatiere;
    nouvelAssignment.photoProf = this.matiereSelectionnee.photoProf;

    //this.assignments.push(nouvelAssignment);
    this.assignmentsService.addAssignment(nouvelAssignment)
    .subscribe((reponseObject) => {
      console.log(reponseObject.message);

      // naviguer programmatiquement vers "/home" pour afficher la liste
      this.router.navigate(["/home"]);
    });
  }

}
