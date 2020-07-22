import {Component, OnInit} from '@angular/core';

import {UracService} from '../services/urac.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private uracService: UracService,
    private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit(): void {
    this.authenticationService.login("owner", "password");
    setTimeout(() => {
      this.uracService.getUser();
      setTimeout(() => {
        this.authenticationService.logout();
      }, 5000);
    }, 5000);
  }
}
