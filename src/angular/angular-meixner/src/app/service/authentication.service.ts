import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RouteSelectorService} from './route-selector.service';
import {Observable} from 'rxjs';
import {AccountService} from '../../swagger-api';
import {LoginDTO} from "../model/LoginDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  @Output() userLoggedIn = new EventEmitter<boolean>(false);

  loginError = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private service: AccountService,
    private routeSelectorService: RouteSelectorService
  ) {
    console.log(this.getAuthenticatedUser());
    if (this.getAuthenticatedUser()) {
      this.userLoggedIn.emit(true);
    }

  }

  emitCurrentData() {
    if (this.getAuthenticatedUser()) {
      this.userLoggedIn.emit(true);
    } else {
      this.userLoggedIn.emit(false);
    }
  }


  getAuthenticatedUser() {
    return sessionStorage.getItem('authenticatedUser');
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem('token');
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  public login(username: string, password: string) {
    console.log("login called");
    let loginDTO = {username: username , password:  password  } as LoginDTO;
    console.log(JSON.stringify(loginDTO));
    const observable = this.service.loginUsingPOST(
      JSON.stringify(loginDTO), 'response'
    );
    //this.router.navigate([this.routeSelectorService.getLastRequestedRouteUrl()]);
    observable
          .subscribe(resp => {
                console.log("login subscribe answer");
                console.log(resp);
                sessionStorage.setItem('authenticatedUser', username);
                sessionStorage.setItem('token', resp.headers.get("Authorization"));
                console.log("saved token is " +sessionStorage.getItem('token'));
                //sessionStorage.setItem('userid', resp.id);
                this.userLoggedIn.emit(true);
                if (this.routeSelectorService.getLastRequestedRouteUrl()) {
                  this.router.navigate([this.routeSelectorService.getLastRequestedRouteUrl()]);
                } else {
                  this.router.navigate(['']);
                }
              this.loginError = false;
            },
            error1 => {
              this.loginError = true;
            });
    return observable;
  }


  logout() {
/*    this.service.logoutUsingGET()
      .subscribe(() => {
          sessionStorage.clear();
          this.router.navigate(['login']);
        }
      );*/
    this.userLoggedIn.emit(false);
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
