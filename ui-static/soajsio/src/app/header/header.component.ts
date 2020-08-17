import {Component, OnInit} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

import {UracService} from '../services/urac.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  lang: string;
  availableLang = ['en', 'fr'];
  userInfo = null;

  setLanguage(value: string) {
    localStorage.setItem('language', value);
  }

  getLanguage() {
    const value: string = localStorage.getItem('language');
    return value;
  }

  switchLanguage(ln) {
    if (this.availableLang.includes(ln)) {
      this.lang = ln;
      this.setLanguage(this.lang);
      this.translateService.use(this.lang);
    } else {
      console.log("Unsupported language: " + ln);
    }
  }

  constructor(
    private translateService: TranslateService,
    private uracService: UracService,
    private authenticationService: AuthenticationService,
  ) {
    this.lang = this.getLanguage();
    if (!this.lang || !this.availableLang.includes(this.lang)) {
      this.lang = 'en';
    }
    this.setLanguage(this.lang);
    translateService.setDefaultLang(this.lang);
  }

  logout() {
    this.authenticationService.logout();
    this.userInfo = null;
  }

  ngOnInit(): void {

    this.uracService.userInfo.subscribe(userInfo => this.userInfo = userInfo);

    $(window).on("scroll", function () {
      let scroll = jQuery(window).scrollTop();

      if (scroll >= 10) {
        $(".navbar").addClass("scrolling");
        $("nav #logo").addClass('blueLogo');

      } else {
        $(".navbar").removeClass("scrolling");
        $("nav #logo").removeClass('blueLogo');
      }
    });
  }

}
