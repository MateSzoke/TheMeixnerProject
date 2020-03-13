import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RouteSelectorService} from './route-selector.service';
import {Observable} from 'rxjs';
import {DefaultService} from '../backend_temp/default.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isUserLoggedIm = false;

  loginError = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private service: DefaultService,
    private routeSelectorService: RouteSelectorService
  ) {

  }

  getAuthenticatedUser() {
    return sessionStorage.getItem('authenticatedUser');
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser())
      return sessionStorage.getItem('token')
  }

  isUserLoggedIn() {
    /*let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null)*/



  }

  public login(username: string, password: string) {
    let observable = this.service.loginUsingPOST(password, username);
    this.router.navigate([this.routeSelectorService.getLastRequestedRouteUrl()]);
    /*    observable
          .subscribe(resp => {
              if (!!resp.username) {
                sessionStorage.setItem('authenticatedUser', resp.username);
                sessionStorage.setItem('token', btoa(resp.username + password));
                sessionStorage.setItem('userid', resp.id);
                if(this.routeSelectorService.getLastRequestedRouteUrl()){
                  this.router.navigate([this.routeSelectorService.getLastRequestedRouteUrl()]);
                } else {
                  this.router.navigate(['']);
                }
              }
              this.loginError = false;
            },
            error1 => {
              this.loginError = true;
            });
        return observable;*/
  }


  logout() {
    this.service.logoutUsingGET()
      .subscribe(() => {
          sessionStorage.clear();
          this.router.navigate(['login']);
        }
      );
  }

}
