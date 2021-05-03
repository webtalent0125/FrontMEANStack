import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  logginActive=true;

  constructor() { }

  log(nomAssignment, action) {
    if(this.logginActive) {
      console.log("Logging Service: " + nomAssignment + " " + action);
    }
  }

  setLogging(flag:boolean) {
    this.logginActive = flag;
  }
}
