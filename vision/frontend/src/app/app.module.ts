import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { App } from './app';
import { Home } from './home/home';
import { Login } from './login/login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { RDashboard } from './receptionists/r-dashboard/r-dashboard';
import { RSidebar } from './receptionists/r-sidebar/r-sidebar';

export const routes: Routes = [ 
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '' },
  { path: 'home', component: Home },
];

@NgModule({

  imports: [
    App,
    Home,
    Login, 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RDashboard,
    RSidebar
  ],
  providers: [],
})
export class AppModule { }