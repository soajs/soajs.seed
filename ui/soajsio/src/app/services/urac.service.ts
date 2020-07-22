import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UracService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
  }

  public getUser(): any {
    let username = this.authenticationService.currentUsernameValue;
    if (username) {
      this.http.get<any>(environment.apiEndpoint + '/urac/user?username=' + username).subscribe(resp => {
        const result: any = resp;
        console.log("URAC");
        console.log(result);
        return result;
      }, error => {
        console.log(error);
        return null;
      });
    } else {
      return null
    }
  }
}
