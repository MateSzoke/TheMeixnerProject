import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RouteSelectorService} from './route-selector.service';
import {AccountService, UserRequest} from '../../swagger-api';
import {LoginDTO} from "../model/LoginDTO";
import {Path} from "../path";
import RoleEnum = UserRequest.RoleEnum;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  @Output() userLoggedIn = new EventEmitter<boolean>(false);
  @Output() userRole = new EventEmitter<RoleEnum>(false);

  loginError = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private service: AccountService,
    private routeSelectorService: RouteSelectorService,
    private accountService: AccountService
  ) {
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
    if (sessionStorage.getItem('role') == 'ADMIN') {
      this.userRole.emit(RoleEnum.ADMIN)
    } else {
      this.userRole.emit(RoleEnum.STUDENT)
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
    let loginDTO = {username: username, password: password} as LoginDTO;
    this.service.loginUsingPOST(JSON.stringify(loginDTO), 'response').subscribe(resp => {
        sessionStorage.setItem('authenticatedUser', username);
        sessionStorage.setItem('token', resp.headers.get("Authorization"));
        this.saveRole()
        this.userLoggedIn.emit(true);
        if (this.routeSelectorService.getLastRequestedRouteUrl()) {
          this.router.navigate([this.routeSelectorService.getLastRequestedRouteUrl()]);
        } else {
          this.navigateToStartPage();
        }
        this.loginError = false;
      },
      () => {
        this.loginError = true;
      });
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
    this.router.navigate([Path.LOGIN]);
  }

  private saveRole() {
    this.accountService.getCurrentUserUsingGET().subscribe(user => {
      sessionStorage.setItem('role', user.role)
      this.userRole.emit(user.role)
    })
  }

  private navigateToStartPage() {
    this.userRole.subscribe(role => {
      if (role == RoleEnum.ADMIN) {
        this.router.navigate([Path.TASKS_MY]);
      } else {
        this.router.navigate([Path.STUDENT_EXERCISES]);
      }
    })
  }

}
