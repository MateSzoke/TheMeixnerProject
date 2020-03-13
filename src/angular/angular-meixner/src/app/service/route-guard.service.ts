import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {RouteSelectorService} from './route-selector.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private routeSelectorService: RouteSelectorService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let slash = String("/");
/*    if (JSON.stringify(state.url) !== JSON.stringify(slash)) {
      this.routeSelectorService.setLastRequestedRouteUrl(state.url);
    } else {
      this.routeSelectorService.setLastRequestedRouteUrl(null);
    }

    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    }

    this.router.navigate(['login']);*/

    return true;
  }

}
