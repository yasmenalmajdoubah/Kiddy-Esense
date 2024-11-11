;
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from'@angular/common/http'
import { AuthoaizationInterceptor } from './interceptor/authoaization.interceptor';
import { SettingComponent } from './setting/setting.component';
import { VerfiyEmailComponent } from './verfiy-email/verfiy-email.component';
import { ErrorHandlingInterceptor } from './interceptor/error-handling.interceptor';
import { NgModule } from '@angular/core';
import { Error401Component } from './error401/error401.component';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LogInComponent,
    SignUpComponent,
    DashBoardComponent,
    HomeComponent,
    ProfileComponent,
    SettingComponent,
    VerfiyEmailComponent,
    Error401Component,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthoaizationInterceptor,multi:true}
    ,
    {provide:HTTP_INTERCEPTORS,useClass:ErrorHandlingInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
