import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { UserComponent } from './user/user.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomBlocksModule } from './custom-blocks/custom-blocks.module';
import { LayoutsModule  } from './layouts/layouts.module';

import { LandingPageComponent } from './layouts/landing-page/landing-page.component';
import { CarComponent } from './car/car.component';
import { AddCarModalComponent } from './modal/add-car-modal/add-car-modal.component';

import { AddBrandModalComponent } from './modal/add-brand-modal/add-brand-modal.component';
import { AddModelModalComponent } from './modal/add-model-modal/add-model-modal.component';




 






@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    CarComponent,
    AddCarModalComponent,
    AddBrandModalComponent,
    AddModelModalComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    FormsModule,
    NgbModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    CustomBlocksModule,
    LayoutsModule
    
  ],
  providers:   [NotificationService,  
    AuthenticationGuard, 
    AuthenticationService,
    UserService,
                        {provide:HTTP_INTERCEPTORS , useClass:AuthInterceptor , multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
