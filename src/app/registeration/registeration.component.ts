import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '../profile/profile.component';
import { UserProfileDataService } from '../service/data/user-profile-data.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  userprofile: UserProfile = <UserProfile>{};
  username ="simplilearn";

  constructor(private router:Router,private userprofiledataservice:UserProfileDataService ) {}

  ngOnInit(): void {
  }


  handleRegisteration () {

   this.userprofiledataservice.registerUserProfile(this.userprofile).subscribe (
      response => {
        console.log (response);
        this.userprofile = response;
      }
   );
   this.router.navigate(['login']);

  }

  handleRegisterationCancel(){
    console.log("Register:");
    this.router.navigate(['welcome']);
  }
}


