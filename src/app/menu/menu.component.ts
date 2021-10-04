import { Component, OnInit } from '@angular/core';
import { HAuthenticationService } from '../service/h-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  //isUserlogedIn:boolean = false;

  constructor( public aAuth : HAuthenticationService) {

  }

  ngOnInit(): void {
    //this.isUserlogedIn = this.aAuth.isUserLoggedIn();
  }

}
