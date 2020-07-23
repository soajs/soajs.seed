import { Component } from '@angular/core';

import {UracService} from './services/urac.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'soajsio';
  constructor(
    private uracService: UracService
  ) {
  }

  ngOnInit(): void {
    this.uracService.getUser();
  }
}
