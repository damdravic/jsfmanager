import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [DashboardComponent, LandingPageComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PagesModule { }
