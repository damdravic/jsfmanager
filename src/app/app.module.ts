import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from '../app/user/user.component';
import { RegisterComponent } from '../app/register/register.component';
import { LoginComponent } from '../app/login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthenticationGuard } from './guards/authentication.guard';
import { NotificationModule } from './notification/notification.module';
import {  NotificationService } from  './service/notification.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PagesModule } from './pages/pages.module'
 


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    FormsModule,
    NgbModule,
    PagesModule
    
  ],
  providers:   [NotificationService,  
    AuthenticationGuard, 
    AuthenticationService,
    UserService,
                        {provide:HTTP_INTERCEPTORS , useClass:AuthInterceptor , multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
