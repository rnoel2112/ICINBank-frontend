import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserProfileDataService } from '../service/data/user-profile-data.service';
import { HAuthenticationService } from '../service/h-authentication.service';


export class UserProfile {
  constructor (
    public id: number,
    public username:string,
    public nationalId:string,
    public dateOfBirth:Date,
    public password:string,
    public bankingRestriction:boolean,
    public checkBookRequest:boolean
  )
  {
  }
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile:UserProfile = <UserProfile>{};
  subscription: Subscription = new Subscription;
  username:string="";
  checkBook:boolean=false;

  constructor(private userprofiledataservice:UserProfileDataService, private route:ActivatedRoute,  private hAuth:HAuthenticationService) { }

  //this.userprofiledataservice.retriveUserProfile(this.route.snapshot.params['name']).subscribe (
  //  this.userprofiledataservice.retriveUserProfile(this.hAuth.username).subscribe (
  ngOnInit(): void {

    this.subscription = this.hAuth.currentMessage.subscribe(username => this.username = username);
    console.log ("user name:" + this.username);
    console.log ("user name:" + this.hAuth.username);
    this.userprofiledataservice.retriveUserProfile(this.username).subscribe (
      response => {
        console.log (response);
        this.userProfile = response;
      }

    );
  }

  checkBookRequired(value:boolean){
    this.checkBook =value;
  }

}

