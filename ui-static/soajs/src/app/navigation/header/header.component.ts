import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  lang: string;
  availableLang = ['en', 'fr'];

  setLanguage(value: string) {
    localStorage.setItem('language', value);
  }

  getLanguage() {
    const value: string = localStorage.getItem('language');
    return value;
  }

  constructor(
    private translateService: TranslateService,
  ) {
    this.lang = this.getLanguage();
    if (!this.lang || !this.availableLang.includes(this.lang)) {
      this.lang = 'en';
    }
    this.setLanguage(this.lang);
    translateService.setDefaultLang(this.lang);
  }

  ngOnInit(): void {
  }

  switchLanguage() {
    if (this.availableLang.includes(this.lang)) {
      this.setLanguage(this.lang);
      this.translateService.use(this.lang);
    } else {
      console.log("Unsupported language: " + this.lang);
    }
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
