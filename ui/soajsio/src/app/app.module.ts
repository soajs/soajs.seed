import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialModule} from './material/material.module';
import {AppRoutingModule} from './routing/app-routing.module';

import {AppComponent} from './app.component';

import {HeaderComponent} from './navigation/header/header.component';
import {LayoutComponent} from './layout/layout.component';

import {ProductComponent} from './product/product.component';
import {HomeComponent} from './home/home.component';
import {WhyusComponent} from './whyus/whyus.component';
import {StoreComponent} from './store/store.component';
import {MemberComponent} from './member/member.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';

import {SoajsInterceptor} from './services/soajs.interceptor';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    WhyusComponent,
    StoreComponent,
    MemberComponent,
    HeaderComponent,
    LayoutComponent,
    SidenavListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SoajsInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
