import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

import {environment} from '../../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UracService {
  private userInfoSource = new BehaviorSubject(null);
  userInfo = this.userInfoSource.asObservable();

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
  }

  public getUser(): any {
    let username = this.authenticationService.currentUsernameValue;
    if (!username) {
      this.userInfoSource.next(null);
    }
    this.http.get<any>(environment.apiEndpoint + '/urac/user?username=' + username).subscribe(resp => {
      this.userInfoSource.next(resp);
    }, _ => {
      this.userInfoSource.next(null);
    });
  }
}
