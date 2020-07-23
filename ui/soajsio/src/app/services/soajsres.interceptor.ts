import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";

import {UracService} from '../services/urac.service';
import {AuthenticationService} from './authentication.service';

import {badTokenMessages} from '../../assets/config';

@Injectable()
export class SoajsresInterceptor implements HttpInterceptor {

  constructor(
    private uracService: UracService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log(event.body);
            console.log(event.status);
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401 && error.error.errors.codes[0] === 401 && badTokenMessages.includes(error.error.errors.details[0].message)) {
            if (this.authenticationService.canReLogin()) {
              this.authenticationService.reLogin().subscribe(resp => {
                if (resp && resp.access_token) {
                  this.uracService.getUser();
                } else {
                  this.authenticationService.logout();
                  this.router.navigate(["/home"]);
                }
              }, error => {
                console.log(error);
                this.authenticationService.logout();
                this.router.navigate(["/home"]);
              });
            } else {
              this.authenticationService.logout();
              this.router.navigate(["/home"]);
            }
          }
        })
    );
  }
}

//{"result":false,"errors":{"codes":[401],"details":[{"code":401,"message":"The access token provided is invalid."}]}}
