import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { UserProfile } from 'src/app/profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export class UserProfileDataService {

  constructor(private http:HttpClient) { }

  retriveUserProfile(username:string){
    console.log (this.http.get(`${API_URL}/users/${username}/profiledetail`));
    return this.http.get <UserProfile> (`${API_URL}/users/${username}/profiledetail`);

  }

  registerUserProfile(userprofile:UserProfile){
    console.log ("Register User Profile:" + userprofile);
    return this.http.post <UserProfile> (`${API_URL}/registeruser`, userprofile);
  }

  retriveAllProfile (){
    console.log ("Register User Profile:" );
    return this.http.get <UserProfile[]> (
      `${API_URL}/users/userprofiles`
    );
  }


}


