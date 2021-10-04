import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountdataService } from '../service/data/accountdata.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  message = "Some Welcome Message";
  userName ='';
  accountMessage:string='';


  constructor(private route:ActivatedRoute,
    private service:AccountdataService) { }

  ngOnInit(): void {
    console.log(this.message);
    this.userName=this.route.snapshot.params['name'];

  }

  getAccountDeatilsForAccount(account:string){
    this.service.retriveAllAccounts(account);
    this.accountMessage=this.service.accountMassage;
    console.log("execute Account Balance bean");
  }

}
