import { Component, OnInit } from '@angular/core';
import { HAuthenticationService } from '../service/h-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private aAuth:HAuthenticationService) { }

  ngOnInit(): void {
    this.aAuth.logout();
  }

}
