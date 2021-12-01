import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

import { DefaultComponent } from './default/default.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { TablePageComponent }  from './table-page/table-page.component';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    TablePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule
  ],exports: [
    TablePageComponent

  ]
})
export class LayoutsModule { }
