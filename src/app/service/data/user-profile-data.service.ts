import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from 'src/app/profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export class UserProfileDataService {

  constructor(private http:HttpClient) { }

  retriveUserProfile(username:string){
    console.log (this.http.get(`http://localhost:8080/users/${username}/profiledetail`));
    return this.http.get <UserProfile> (`http://localhost:8080/users/${username}/profiledetail`);

  }


  registerUserProfile(userprofile:UserProfile){
    console.log ("Register User Profile:" + userprofile);
    return this.http.post <UserProfile> (`http://localhost:8080/users/${userprofile.username}/profiledetail`, userprofile);
  }
}


