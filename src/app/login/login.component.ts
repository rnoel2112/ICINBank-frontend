import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HAuthenticationService } from '../service/h-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string ="simplilearn";
  password:string ='';
  errorMessage:string = "Invalid Credential";
  isValidLogin:boolean=true;

  constructor(private router:Router,
      private hAuth:HAuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin(){
    if (this.hAuth.authenticate(this.username,this.password)){
      console.log ("Login In Success");
      this.isValidLogin = true;
      this.router.navigate(['welcome',this.username]);
    } else {
      this.isValidLogin = false;
    }
  }

}
