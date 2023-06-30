import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { BrowserUtils } from '@azure/msal-browser';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent, canActivate: [MsalGuard]},
  {path: '', component: HomeComponent}
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      //no realizar nav inicial en iframes o ventanas emergentes
      initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
      ? 'enabledNonBlocking' : 'disabled', //establecer enabledNonBlocking para usar angular universal
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
