import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {UracService} from '../../services/urac.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  userInfo = null;

  constructor(
    private uracService: UracService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {

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

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
