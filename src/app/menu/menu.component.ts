import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../profile/profile.component';
import { UserProfileDataService } from '../service/data/user-profile-data.service';
import { HAuthenticationService } from '../service/h-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isUserlogedIn:boolean = false;
  userProfile:UserProfile = <UserProfile>{};

  constructor( public authService : HAuthenticationService,
      public profileService:UserProfileDataService) {
  }

  ngOnInit(): void {

    this.isUserlogedIn = this.authService.isUserLoggedIn();
    console.log("isUserlogedIn:"+this.isUserlogedIn);
    this.profileService.retriveUserProfile(this.authService.username).subscribe (
      response => {
        console.log ("In Menu:" + response);
        this.userProfile = response;

      }
    );
  }

}
