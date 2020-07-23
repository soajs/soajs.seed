import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {AuthenticationService} from './authentication.service';

import {noToken} from '../../assets/apis';

@Injectable()
export class SoajskeyInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
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
    return next.handle(request);
  }
}
