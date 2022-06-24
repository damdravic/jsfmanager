import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DefaultComponent } from './default/default.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { TablePageComponent }  from './table-page/table-page.component';
import { MainPageComponent } from './main-page/main-page.component';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    TablePageComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    NgbModule
  ],exports: [
    TablePageComponent

  ]
})
export class LayoutsModule { }
