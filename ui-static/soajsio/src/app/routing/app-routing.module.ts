import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {StoreComponent} from "../store/store.component";
import {HomeComponent} from "../home/home.component";
import {LoginComponent} from "../login/login.component";
import {MemberComponent} from "../member/member.component";

import {AuthGuard} from '../services/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'store', component: StoreComponent},
  {
    path: 'member', component: MemberComponent,
    canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
