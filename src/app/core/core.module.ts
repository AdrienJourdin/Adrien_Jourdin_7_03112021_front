import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthTokenInjectorInterceptorService } from "./interceptor/authTokenInjector.interceptor";

@NgModule({

  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

  ],
  exports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInjectorInterceptorService, multi: true }
  ]
})


export class CoreModule{}
