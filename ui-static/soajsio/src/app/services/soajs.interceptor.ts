import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {throwError, BehaviorSubject, Observable} from "rxjs";
import {filter, switchMap, take, tap} from "rxjs/operators";

import {UracService} from '../services/urac.service';
import {AuthenticationService} from './authentication.service';

import {badTokenMessages} from '../../assets/config';
import {noToken} from "../../assets/apis";
import {environment} from "../../environments/environment";

@Injectable()
export class SoajsInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private uracService: UracService,
    private authenticationService: AuthenticationService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let access_token = this.authenticationService.currentAccessTokenValue;
    let url = request.url;
    if (url.indexOf("?") !== -1) {
      url = url.substr(0, url.indexOf("?"));
    }
    url = url.substr(url.indexOf("://") + 3);
    url = url.substr(url.indexOf("/"));
    if (url !== '' && (noToken.includes(url) || !access_token)) {
      request = request.clone({
        headers: new HttpHeaders({
          'key': environment.tenant
        })
      });
    } else {
      request = request.clone({
        headers: new HttpHeaders({
          'key': environment.tenant,
          'access_token': access_token
        })
      });
    }
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log(event.body);
            console.log(event.status);
          }
        },
        (error: HttpErrorResponse) => {
          if (error && error.status === 401 && error.error.errors.codes[0] === 401 && badTokenMessages.includes(error.error.errors.details[0].message)) {
            if (this.authenticationService.canReLogin()) {
              if (this.refreshTokenInProgress) {
                return this.refreshTokenSubject.pipe(
                  filter(result => result !== null),
                  take(1),
                  switchMap(() => next.handle(request))
                );
              } else {
                this.refreshTokenInProgress = true;
                this.refreshTokenSubject.next(null);
                return this.authenticationService.reLogin().subscribe(resp => {
                  if (resp && resp.access_token) {
                    this.refreshTokenSubject.next(true);
                    this.uracService.getUser();
                    this.refreshTokenInProgress = false;
                    return next.handle(request)
                  } else {
                    this.refreshTokenInProgress = false;
                    return this.authenticationService.logout();
                  }
                }, error => {
                  console.log(error);
                  this.refreshTokenInProgress = false;
                  return this.authenticationService.logout();
                });
              }
            } else {
              return this.authenticationService.logout();
            }
          } else {
            return throwError(error);
          }
        }
      ))
  };
}
