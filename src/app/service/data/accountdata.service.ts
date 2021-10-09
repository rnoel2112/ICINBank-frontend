import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { AccountDetail, AccountDetailsComponent } from 'src/app/account-details/account-details.component';
import { API_URL } from 'src/app/app.constants';


@Injectable({
  providedIn: 'root'
})

export class AccountdataService {

  accountMassage:string ='';
  accountDetails:AccountDetail[] =[];

  constructor(
    private http:HttpClient
  ) {

  }


  retriveAllAccounts(username:string){
    console.log (this.http.get(`$API_URL}/users/${username}/accountdetails`));
    return this.http.get <AccountDetail[]> (`${API_URL}/users/${username}/accountdetails`);

  }

  retriveAccounts(username:string){
    let basicAuthHeaderString = this.authHeader();

    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `${basicAuthHeaderString}`)
    }

    console.log("new auth:" + basicAuthHeaderString );
    console.log("new auth:" + header.headers );

    return this.http.get <AccountDetail[]> (
      `${API_URL}/users/simplilearn/useraccountdetails`, header
    );

   // console.log (this.http.get(`http://localhost:8080/users/${username}/useraccountdetails`));
   // return this.http.get <AccountDetail[]> (`http://localhost:8080/users/${username}/useraccountdetails);

  }

  retriveAccountInfo(username:string){
    console.log (this.http.get(`${API_URL}/users/${username}/accountinfo`));
    return this.http.get <AccountDetail> (`${API_URL}/users/${username}/accountinfo`);

  }

  deposit(deposit:AccountDetail){

    return this.http.post <AccountDetail> (`${API_URL}/users/${deposit.username}/deposit`, deposit);

  }

  transfer(fromAccount:AccountDetail, toAccount:AccountDetail){

    this.accountDetails.push(fromAccount);
    this.accountDetails.push(toAccount);
    return this.http.post <AccountDetail> (`${API_URL}/users/${fromAccount.username}/transfer`, this.accountDetails);

  }


  handleAccountDeatilsResponse (response:any) {
    console.log("Response from Java:"+ response.message);
    this.accountMassage=response.message
  }

  handleAccountDeatilsError(error:any){
    console.log("Error from Java:"+ error);
    console.log("Error from Java:"+ error.error.message);
    this.accountMassage=error.error.message;
  };

  authHeader(){
    let username = 'simplilearn';
    let password = 'admin';
    let basicAuthHeaderString = 'Basic '+ window.btoa(username+':'+password);
    return basicAuthHeaderString;

  }

}
