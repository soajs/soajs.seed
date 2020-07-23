import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    WhyusComponent,
    StoreComponent,
    HeaderComponent,
    LayoutComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
