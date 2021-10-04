import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HAuthenticationService } from '../service/h-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username ="simplilearn";
  password ='';
  errorMessage = "Invalid Credential";
  isValidLogin:boolean=true;

  constructor(private router:Router,
      private hAuth:HAuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin(){
    console.log("Before LogIn:"+this.hAuth.isUserLoggedIn());
    if (this.hAuth.authenticate(this.username,this.password)){
      this.isValidLogin = true;
      this.router.navigate(['welcome',this.username]);
      console.log("After Login Success:"+this.hAuth.isUserLoggedIn());
    } else { this.isValidLogin = false;
    }

  }

}
