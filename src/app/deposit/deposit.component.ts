import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountDetail } from '../account-details/account-details.component';
import { AccountdataService } from '../service/data/accountdata.service';
import { HAuthenticationService } from '../service/h-authentication.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  accountDetails:AccountDetail[] =[];
  depositAmount:number =0;
  accountNumber:string="";
  accountBalance:number=0;
  depReason:string="";

  deposit:AccountDetail = <AccountDetail> {};


  constructor(private accountdataservice:AccountdataService,
      private hAuth:HAuthenticationService, private router:Router) {
  }

  ngOnInit(): void {

    console.log ("user name in Account Details:" + this.hAuth.username);
    this.accountdataservice.accountBalance(this.hAuth.username).subscribe (
      response => {
        console.log ("depsot Balance:" + response);
        this.deposit = response;
        this.accountNumber = this.deposit.accountId ;
        this.accountBalance = this.deposit.balance ;
      }
    );

  }

  handleDeposit(){

    this.deposit.activity = this.depReason;
    this.deposit.amount = this.depositAmount;
    this.deposit.balance += this.depositAmount;
    this.deposit.isCredit = false;
    this.deposit.isSaving = true;
    this.deposit.transactionDate = new Date();
    this.deposit.id = -1;

    if (this.deposit.amount > 0) {
      this.accountdataservice.deposit(this.deposit).subscribe (
          response => {
            console.log (response);
            this.deposit = response;
          }
      );
    }
   this.router.navigate(['accountdetails']);

  }

  handleDepositCancel() {
    this.router.navigate(['accountdetails']);
  }



}
