import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { VerfiyEmailComponent } from './verfiy-email/verfiy-email.component';
import { Error404Component } from './error404/error404.component';
import { Error401Component } from './error401/error401.component';
import { kiddyGuard } from './guard/kiddy.guard';

const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'login',component:LogInComponent},
  {path:'register',component:SignUpComponent},
  {path:'verfiyEmail',component:VerfiyEmailComponent},
  {path:'error404',component:Error404Component},
  {path:'error401',component:Error401Component},

  {path:'dashBoard',component:DashBoardComponent,canActivate:[kiddyGuard],children:[
    {path:'setting',component:SettingComponent}
,
    {path:'home',component:HomeComponent},
    {path:'profile',component:ProfileComponent}
 
   ]}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
