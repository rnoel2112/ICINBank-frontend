import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountDetail } from '../account-details/account-details.component';
import { AccountdataService } from '../service/data/accountdata.service';
import { HAuthenticationService } from '../service/h-authentication.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})

export class TransferComponent implements OnInit {

accountDetails:AccountDetail[] =[];
accountNumber:string="";
accountBalance:number=0;


transferUserName:string="";
accountNoToTransfer:string="";
transferAmount:number =0;
transferReason:string="";


fromAccount:AccountDetail = <AccountDetail> {};
toAccount:AccountDetail   = <AccountDetail> {};

constructor(private accountdataservice:AccountdataService,
  private hAuth:HAuthenticationService, private router:Router) {
}

  ngOnInit(): void {

    //console.log ("user name in Account Details:" + this.hAuth.username);
    this.accountdataservice.retriveAccounts(this.hAuth.username).subscribe (
      response => {
        console.log (response);
        this.accountDetails = response;

        for (var def of this.accountDetails){
          this.fromAccount = <AccountDetail> def;
          this.accountNumber = this.fromAccount.accountId ;
          this.accountBalance = this.fromAccount.balance ;
        }
      }
    );
  }

  handleTransfer(){

    console.log ("Transfer User name:"+ this.transferUserName);
    this.accountdataservice.retriveAccountInfo(this.transferUserName).subscribe (
      response => {
        console.log (response);
        this.toAccount = <AccountDetail> response;
        console.log("Transfer Account:" + this.toAccount );
        console.log("Transfer Account Balance:" + this.toAccount.balance );
      }
    );

    this.toAccount.username   = this.transferUserName;
    this.toAccount.accountId  = this.accountNoToTransfer;
    this.toAccount.amount     = this.transferAmount;
    this.toAccount.activity   = this.transferReason;
    this.toAccount.balance    = this.toAccount.balance + this.transferAmount;
    console.log("updated Transfer Account Balance:" + this.toAccount.balance );

    this.toAccount.transactionDate = new Date();
    this.toAccount.isCredit   = false;
    this.toAccount.isSaving   = true;
    this.toAccount.id         = -1;


    this.fromAccount.amount     = this.transferAmount;
    this.fromAccount.activity   = this.transferReason;
    this.fromAccount.balance    = this.fromAccount.balance - this.transferAmount;
    this.fromAccount.transactionDate = new Date();
    this.fromAccount.isCredit   = true;
    this.fromAccount.isSaving   = true;
    this.fromAccount.id         = -1;

    console.log("To Acconut Id: " + this.toAccount.accountId);
    console.log("To Acconut Balance:" + this.toAccount.balance);
    console.log("From Acconut id;" + this.fromAccount.accountId);
    console.log("from Acconut Balance:" + this.fromAccount.balance);

    if (this.fromAccount.balance > 0) {
      this.accountdataservice.transfer(this.fromAccount,this.toAccount).subscribe (
          response => {
            console.log ("Post Transfer Resposne: " + response);
            this.fromAccount = response;
          }
      );
    }

   this.router.navigate(['accountdetails']);

  }

  handleCancel(){
    this.router.navigate(['accountdetails']);

  }

}
