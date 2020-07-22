import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from "soajs.seed/ui/soajsio/src/environments/environment";
import {AuthenticationService} from './authentication.service';

@Injectable()
export class SoajskeyInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
    ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf("/oauth/token") === -1) {
      let access_token = this.authenticationService.currentAccessTokenValue;
      if (access_token) {
        request = request.clone({
          headers: new HttpHeaders({
            'key': environment.tenant,
            'access_token': access_token
          })
        });
      } else {
        request = request.clone({
          headers: new HttpHeaders({
            'key': environment.tenant
          })
        });
      }
    } else {
      request = request.clone({
        headers: new HttpHeaders({
          'key': environment.tenant
        })
      });
    }
    return next.handle(request);
  }
}
