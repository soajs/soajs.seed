import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

import {Token} from '../_models/token';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentTokenSubject: BehaviorSubject<Token>;
  public currentToken: Observable<Token>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
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

  public get isLoggedIn(): boolean {
    return !!(this.currentTokenSubject && this.currentTokenSubject.value);
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

  canReLogin(): boolean {
    return !!(this.currentTokenSubject && this.currentTokenSubject.value && this.currentTokenSubject.value.refresh_token && this.currentTokenSubject.value.username);
  }

  reLogin(): any {
    const body = {
      refresh_token: this.currentTokenSubject.value.refresh_token,
      grant_type: 'refresh_token'
    };
    return this.http.post<any>(environment.apiEndpoint + '/oauth/token', body)
      .pipe(map(token => {
        if (token && token.access_token) {
          token.username = this.currentTokenSubject.value.username;
          localStorage.setItem('token', JSON.stringify(token));
          this.currentTokenSubject.next(token);
        }
        return token;
      }));
  }

  logout() {
    if (this.currentTokenSubject && this.currentTokenSubject.value) {
      this.http.delete<any>(environment.apiEndpoint + '/oauth/refreshToken/' + this.currentTokenSubject.value.refresh_token).subscribe();
      this.http.delete<any>(environment.apiEndpoint + '/oauth/accessToken/' + this.currentTokenSubject.value.access_token).subscribe();
    }
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.currentTokenSubject.next(null);
    this.router.navigate(["/home"]);
    return null;
  }
}
