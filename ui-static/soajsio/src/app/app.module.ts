import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {NgModule} from '@angular/core';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {MaterialModule} from './material/material.module';

import {AppRoutingModule} from './routing/app-routing.module';
import {AppComponent} from './app.component';

import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";

import {HomeComponent} from './home/home.component';

import {StoreComponent} from './store/store.component';
import {LoginComponent} from './login/login.component';

import {SoajsInterceptor} from './services/soajs.interceptor';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    FooterComponent,

    HomeComponent,
    StoreComponent,
    LoginComponent
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

    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SoajsInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
