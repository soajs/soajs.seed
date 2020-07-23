import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Token} from '../models/token';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentTokenSubject: BehaviorSubject<Token>;
  public currentToken: Observable<Token>;

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('token')));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentAccessTokenValue(): string {
    if (this.currentTokenSubject && this.currentTokenSubject.value) {
      return this.currentTokenSubject.value.access_token;
    } else {
      return null;
    }
  }

  public get currentUsernameValue(): string {
    if (this.currentTokenSubject && this.currentTokenSubject.value) {
      return this.currentTokenSubject.value.username;
    } else {
      return null;
    }
  }

  login(email: string, password: string): any {
    const body = {
      username: email,
      password,
      grant_type: 'password'
    };

    return this.http.post<any>(environment.apiEndpoint + '/oauth/token', body)
      .pipe(map(token => {
        if (token && token.access_token) {
          token.username = email;
          localStorage.setItem('token', JSON.stringify(token));
          this.currentTokenSubject.next(token);
        }
        return token;
      }));
  }

  logout() {
    this.http.delete<any>(environment.apiEndpoint + '/oauth/refreshToken/' + this.currentTokenSubject.value.refresh_token).subscribe(resp => {
      return resp;
    }, error => {
      return error;
    });

    this.http.delete<any>(environment.apiEndpoint + '/oauth/accessToken/' + this.currentTokenSubject.value.access_token).subscribe(resp => {
      return resp;
    }, error => {
      return error;
    });

    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.currentTokenSubject.next(null);
  }
}
