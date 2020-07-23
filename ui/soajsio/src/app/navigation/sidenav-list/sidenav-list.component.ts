import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

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
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.uracService.userInfo.subscribe(userInfo => this.userInfo = userInfo);
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };

  logout() {
    this.authenticationService.logout();
    this.userInfo = null;
    this.router.navigate(["/home"]);
  }
}
