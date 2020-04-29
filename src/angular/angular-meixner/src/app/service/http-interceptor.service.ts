import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(
    private authenticationService : AuthenticationService,
    private router : Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    let authHeaderString = this.authenticationService.getAuthenticatedToken();
    let username = this.authenticationService.getAuthenticatedUser();
    if(authHeaderString && username) {
      console.log("adding jwt to header...");
      request = request.clone({
        setHeaders : {
          Authorization : authHeaderString
        }
      });
    }

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          sessionStorage.clear();
          this.router.navigate(['login']);
        }
      }
    }));
  }


}
