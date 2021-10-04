import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HAuthenticationService {

  username ="";
  password="";
  errorMessage = "Invalid Credential";
  inValidLogin = true;

  private messageSource = new BehaviorSubject(this.username);
  currentMessage = this.messageSource.asObservable();

  constructor() { }
  authenticate (username:string,password:string){
    if (username === "simplilearn" && password === "admin"){
      this.username = username;
      this.changeMessage(username);
      sessionStorage.setItem("authenticatedUser",username);
      return true;
    }
    return false;
  }
  isUserLoggedIn(){
    let user =sessionStorage.getItem("authenticatedUser");
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem("authenticatedUser");
  }


  changeMessage(message: string) {
    console.log ("changeMessage: " + message);
    this.messageSource.next(message)
  }

}



