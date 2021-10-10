import { Component, OnInit } from '@angular/core';
import { AccountdataService } from '../service/data/accountdata.service';
import { HAuthenticationService } from '../service/h-authentication.service';

export class AccountDetail {
  constructor (
    public id: number,
    public username:string,
    public accountId:string,
    public isSaving:boolean,
    public activity:string,
    public transactionDate:Date,
    public isCredit:boolean,
    public amount:number,
    public balance:number
  )
  {
  }
}

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  accountDetails:AccountDetail[] =[];
  accountNumber:String="";

  constructor(
    private accountdataservice:AccountdataService, private hAuth:HAuthenticationService
  ) { }

  ngOnInit(){

    console.log ("user name in Account Details:" + this.hAuth.username);
    this.accountdataservice.retriveAccounts(this.hAuth.username).subscribe (
      response => {
        console.log (response);
        this.accountDetails = response;

        for (var def of this.accountDetails){
          var test = <AccountDetail> def;
          this.accountNumber = test.accountId ;
          console.log("Account Id ", test.accountId );
        }
      }
    );

    



  }

}
