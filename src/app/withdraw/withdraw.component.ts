import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountDetail } from '../account-details/account-details.component';
import { AccountdataService } from '../service/data/accountdata.service';
import { HAuthenticationService } from '../service/h-authentication.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  accountDetails:AccountDetail[] =[];
  withdrawAmount:number =0;
  accountNumber:string="";
  accountBalance:number=0;
  withdrawReason:string="";

  debit:AccountDetail = <AccountDetail> {};

  constructor(private accountdataservice:AccountdataService,
    private hAuth:HAuthenticationService, private router:Router) {
  }

  ngOnInit(): void {
    console.log("Withdraw Username:"+ this.hAuth.username);
    this.accountdataservice.accountBalance(this.hAuth.username).subscribe (
      response => {
        console.log (response);
        this.debit = response;
        this.accountNumber = this.debit.accountId ;
        this.accountBalance = this.debit.balance ;

      }
    );

  }

  handleDebitl(){

    this.debit.activity = this.withdrawReason;
    this.debit.amount = this.withdrawAmount;
    this.debit.balance -= this.withdrawAmount;
    this.debit.isCredit = true;
    this.debit.isSaving = true;
    this.debit.transactionDate = new Date();
    this.debit.id = -1;

    if (this.debit.amount > 0) {
      this.accountdataservice.deposit(this.debit).subscribe (
        response => {
          console.log (response);
          this.debit = response;
        }
      );
    }
  this.router.navigate(['accountdetails']);

  }

  handleDebitCancel() {
    this.router.navigate(['accountdetails']);

  }

}
