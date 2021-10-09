import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicAuthenticationService } from '../auth/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterAuthService implements HttpInterceptor{

  constructor(private authservice:BasicAuthenticationService ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){

    let authHeaderString = this.authservice.getAuthenticatedToken();
    let username = this.authservice.getAuthenticatedUser();

    if (authHeaderString && username){
      request = request.clone ({
        setHeaders : {
          Authorization : authHeaderString
        }
      })
    }
    return next.handle(request);
  }

}
