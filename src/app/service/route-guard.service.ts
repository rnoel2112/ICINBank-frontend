import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, Router} from '@angular/router';
import { HAuthenticationService } from './h-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private aAuth:HAuthenticationService,
    private router:Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.aAuth.isUserLoggedIn())
      return true;
    this.router.navigate(['login']);
    
    return false;
  }
}
