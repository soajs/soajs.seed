import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from '../home/home.component';

import {ProductComponent} from '../product/product.component';
import {WhyusComponent} from '../whyus/whyus.component';
import {StoreComponent} from '../store/store.component';
import {MemberComponent} from '../member/member.component';
import {LoginComponent} from '../login/login.component';

import {AuthGuard} from '../services/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'product', component: ProductComponent},
  {path: 'whyus', component: WhyusComponent},
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
export class AppRoutingModule {
}
