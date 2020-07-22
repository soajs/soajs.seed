import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {UracService} from '../../services/urac.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  userInfo = null;

  constructor(
    private uracService: UracService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  login() {
    this.authenticationService.login("owner", "password");
    setTimeout(() => {
      this.userInfo = this.uracService.getUser();
      console.log(this.userInfo);
    }, 1000);
  }

  logout() {
    this.authenticationService.logout();
    this.userInfo = null;
  }
}
