import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators'
import { API_URL } from 'src/app/app.constants';

export class AuthenticationBean
{
  constructor(public message:string){}
}

@Injectable({
  providedIn: 'root'
})

export class BasicAuthenticationService {

  username ="";
  password ="";
  errorMessage = "Invalid Credential";
  inValidLogin = true;


  private messageSource = new BehaviorSubject(this.username);
  currentMessage        = this.messageSource.asObservable();

  constructor(private http:HttpClient) { }

  executeAuthenticationService(username:string,password:string){

    let basicAuthHeaderString = 'Basic '+ window.btoa(username+':'+password);
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `${basicAuthHeaderString}`)

    }


    console.log("new auth:" + basicAuthHeaderString );

    return this.http.get <AuthenticationBean> (
      `${API_URL}/basicauth`, header
    ).pipe (
      map(
        data =>{
          sessionStorage.setItem("authenticatedUser",username);
          sessionStorage.setItem("token",basicAuthHeaderString);
          //this.username = username;
          return data;
        }
      )
    );
  }

  getAuthenticatedToken(){
    return sessionStorage.getItem("token");
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem("authenticatedUser");
  }

}
