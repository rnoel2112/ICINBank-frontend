import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { DepositComponent } from './deposit/deposit.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { RouteGuardService } from './service/route-guard.service';
import { TransferComponent } from './transfer/transfer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

const routes: Routes = [
  { path:'', component:WelcomeComponent},
  { path:'login', component:LoginComponent},
  { path:'logout', component:LogoutComponent, canActivate:[RouteGuardService]},
  { path:'registeration', component:RegisterationComponent},
  { path:'deposit', component:DepositComponent,canActivate:[RouteGuardService]},
  { path:'withdraw', component:WithdrawComponent,canActivate:[RouteGuardService]},
  { path:'transfer', component:TransferComponent,canActivate:[RouteGuardService]},
  { path:'profile', component:ProfileComponent,canActivate:[RouteGuardService]},
  { path:'welcome', component:WelcomeComponent},
  { path:'welcome/:name', component:WelcomeComponent,canActivate:[RouteGuardService]},
  { path:'accountdetails', component:AccountDetailsComponent,canActivate:[RouteGuardService]},
  { path:'**', component:ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
