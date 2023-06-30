import { MsalService, MsalBroadcastService, MsalGuardConfiguration, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject, filter, takeUntil } from 'rxjs';
import { InteractionStatus, PopupRequest, RedirectRequest } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Azure AD - Auth';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, private authService: MsalService, private msalBroadcastService: MsalBroadcastService) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.msalBroadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    )
    .subscribe(() => {
      this.setLoginDisplay();
    })
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect(
        {...this.msalGuardConfig.authRequest} as RedirectRequest
      );
    } else {
      this.authService.loginRedirect();
    }
  }

  logout(){
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}