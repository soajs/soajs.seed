import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {UracService} from '../services/urac.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  userInfo = null;

  constructor(
    private uracService: UracService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.uracService.userInfo.subscribe(userInfo => this.userInfo = userInfo);
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(resp => {
      this.uracService.getUser();
      this.router.navigate(["/member"]);
    }, error => {
      console.log(error);
      this.error = error;
      this.loading = false;
      this.router.navigate(["/home"]);
    });
  }
}
