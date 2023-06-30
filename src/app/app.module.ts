import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MsalModule, MsalGuardConfiguration, MsalInterceptorConfiguration, MsalRedirectComponent, MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

const isIE: boolean = window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;
const MsalInterceptorConfig = {} as MsalInterceptorConfiguration;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: 'a03ef3da-fb8c-4145-9d5c-ca88f13516c2',
          authority: 'https://login.microsoftonline.com/36909617-48c3-450d-872f-a22e8755f163',
          redirectUri: 'http://localhost:4200'
        },
        cache: {
          cacheLocation: 'sessionStorage',
          storeAuthStateInCookie: isIE
        }
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read']
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          ["https://graph.microsoft.com/v1.0/me", ["user.read"]],
        ])
      }
    )
  ],
  providers: [
    MsalGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
