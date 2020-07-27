import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialModule} from './material/material.module';
import {AppRoutingModule} from './routing/app-routing.module';

import {AppComponent} from './app.component';

import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {HeaderComponent} from './navigation/header/header.component';
import {LayoutComponent} from './layout/layout.component';

import {ProductComponent} from './product/product.component';
import {HomeComponent} from './home/home.component';
import {WhyusComponent} from './whyus/whyus.component';
import {StoreComponent} from './store/store.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
