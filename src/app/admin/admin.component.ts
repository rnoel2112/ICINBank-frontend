import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '../profile/profile.component';
import { BasicAuthenticationService } from '../service/auth/basic-authentication.service';
import { UserProfileDataService } from '../service/data/user-profile-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userProfile:UserProfile = <UserProfile>{};
  userProfiles:UserProfile[] =[];
  username:string="";

  constructor(private authService:BasicAuthenticationService,
    private profileService:UserProfileDataService,
    private router:Router) { }

  ngOnInit(): void {
    console.log ( "admin-user name:"+this.authService.getAuthenticatedUser());
    this.username = <string> this.authService.getAuthenticatedUser();

    this.profileService.retriveUserProfile(this.username).subscribe (
      response => {
        this.userProfile = response;
        console.log ("Admin profile:"+ this.userProfile.isAdmin +":"+this.userProfile.password);
      }
    );

    if (!this.userProfile.isAdmin){
      this.profileService.retriveAllProfile().subscribe (
       response => {
         console.log (response);
          this.userProfiles = response;
       }
      );
    } else {
        this.userProfiles =[];
        this.router.navigate(['welcome',this.username]);
    }
  }
}
