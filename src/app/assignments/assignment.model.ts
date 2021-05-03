export class Assignment {
  _id?:string;
  id?:number;
  nom:string;
  dateDeRendu:Date;
  rendu?:boolean;
  auteur: string;
  matiere: string;
  imageMatiere: string;
  photoProf: string;
  note?: number;
  remarques?: string;
}

export class AssignmentSubject {
  matiere: string;
  imageMatiere: string;
  nomProf: string;
  photoProf: string;
}
