import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationBean, BasicAuthenticationService } from './auth/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HAuthenticationService {

  username ="";
  password="";
  errorMessage = "Invalid Credential";
  inValidLogin = true;
  aBean: AuthenticationBean | undefined;

  private messageSource = new BehaviorSubject(this.username);
  currentMessage = this.messageSource.asObservable();

  constructor(private authservice:BasicAuthenticationService ) { }

  // authenticate (username:string,password:string){
  //   if (username === "simplilearn" && password === "admin"){
  //     this.username = username;
  //     this.changeMessage(username);
  //     sessionStorage.setItem("authenticatedUser",username);
  //     return true;
  //   }
  //   return false;
  // }

  authenticate (username:string,password:string){

    this.authservice.executeAuthenticationService (username,password).subscribe (
     response => {
       console.log ("Message from Auth:"+response);
       this.aBean = response;
       this.username = username;
       this.changeMessage(username);
   // sessionStorage.setItem("authenticatedUser",username);
       this.inValidLogin=true;
      },
      error =>{
        this.inValidLogin=false;
      }
     );
     return this.inValidLogin;
 }

  isUserLoggedIn(){
    let user =sessionStorage.getItem("authenticatedUser");
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem("authenticatedUser");
    sessionStorage.removeItem("token");
  }

  changeMessage(message: string) {
    console.log ("changeMessage: " + message);
    this.messageSource.next(message)
  }

}



