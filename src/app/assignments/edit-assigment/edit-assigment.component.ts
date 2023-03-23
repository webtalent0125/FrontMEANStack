import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment, AssignmentSubject } from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css'],
})
export class EditAssigmentComponent implements OnInit {
  nomAssignment = '';
  dateDeRendu = null;
  assignment: Assignment;
  remarqueAssignment : string;
  note: number;
  auteur: string;

  matiereProfs : AssignmentSubject[];
  matiereSelectionnee : AssignmentSubject;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route:ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {

    this.matiereProfs = [
      {matiere: "Programmation Web", imageMatiere:"https://www.enukesoftware.com/blog/wp-content/uploads/2016/10/meanjs-1024x492-1024x575.jpg", nomProf: "Michel Buffa", photoProf:"https://i1.rgstatic.net/ii/profile.image/712495153029121-1546883490651_Q512/Michel-Buffa.jpg"},
      {matiere: "Securite des SI", imageMatiere:"https://www.yokogawa.com/eu/blog/oil-gas/app/uploads/2020/04/116137226_s-1440x564_c.jpg", nomProf: "Remi Esclangon", photoProf:"https://c1.10times.com/company/1580891249/369465e3a7c71c73aa.png"},
      {matiere: "Gestion de projets", imageMatiere:"https://specials-images.forbesimg.com/imageserve/5f5a2d56d0844debd57de789/960x0.jpg?fit=scale", nomProf: "Michel Winter", photoProf:"https://image-uviadeo.journaldunet.com/image/450/1513213475/37287.jpg"},
      {matiere: "ERP", imageMatiere:"https://www.choisirmonerp.com/Content/images/rubrics/fr-FR/erp-definition-2.png", nomProf: "Yossi Gal", photoProf:"http://miageprojet2.unice.fr/@api/deki/files/1353/=YossiGal.jpg?size=thumb"},
      {matiere: "SCRUM/AGILE", imageMatiere:"https://img-0.journaldunet.com/zUEeQr1IIsqVIibuDl4WQ-AIS-8=/1280x/smart/c50c46058ce74040a853bfb412e471af/ccmcms-jdn/15440567.jpg", nomProf: "Pascal Bohn", photoProf:"https://i.imgur.com/xH3KBVq.png"},
      {matiere: "JEE", imageMatiere:"https://jakarta.ee/images/jakarta/jakarta_ee_400x400.png", nomProf: "Richard Grin", photoProf:"https://i.imgur.com/fLhToni.png"},
    ];




  }

  ngOnInit(): void {
    // on doit récupérer l'id dans l'URL, et on doit utiliser
    // le service de gestion des assignments pour récupérer l'assignment
    // qui a cet id
    // Le "+ ci-dessous force la conversion string vers number (les urls sont des strings)"
    this.getAssignment();

    // récupération des queryParams
    let nom = this.route.snapshot.queryParams.nom;
    //console.log("nom récupéré dans l'URL : " + nom)
    console.log(this.route.snapshot.queryParams);

    console.log("fragment = " + this.route.snapshot.fragment)

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  // récupère l'id puis l'assignment correspondant
  getAssignment() {
    let id = +this.route.snapshot.params.id;
    console.log('Dans le ngOnInit id récupéré = ' + id);

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;
      // pour que le formulaire affiche les noms et dates
      this.nomAssignment = this.assignment.nom;
      this.dateDeRendu = this.assignment.dateDeRendu;
      this.remarqueAssignment = this.assignment.remarques;
      this.note = this.assignment.note;
      this.auteur = this.assignment.auteur;

      for(let i=0; i<6; i++ ){
        if(this.assignment.matiere == this.matiereProfs[i].matiere)
        {
          this.matiereSelectionnee = this.matiereProfs[i];
        }
      }
    });
  }

  onSaveAssignment(event) {
    // on ne veut pas que ça soumette le formulaire, on va donc
    // "empêcher le comportement par défaut"
    // permet d'éviter le warning
    event.preventDefault();

    if(this.nomAssignment) {
      this.assignment.nom = this.nomAssignment;
    }

    if(this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }

    if(this.remarqueAssignment)
    {
      this.assignment.remarques = this.remarqueAssignment;
    }

    if(this.note)
    {
      this.assignment.note = this.note;
      this.assignment.rendu= true;
    }

    if(this.auteur)
    {
      this.assignment.auteur = this.auteur;
    }

    this.assignment.photoProf = this.matiereSelectionnee.photoProf;
    this.assignment.matiere = this.matiereSelectionnee.matiere;
    this.assignment.imageMatiere = this.matiereSelectionnee.imageMatiere;

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((reponseObject) => {
        console.log(reponseObject.message);

        // et on retourne à la page d'accueil pour afficher la liste
        this.router.navigate(['/home']);
      });
  }
}
