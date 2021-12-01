import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { SheaderComponent } from './components/sheader/sheader.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SheaderComponent
   
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule
  ],exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SheaderComponent

  ]
})
export class SharedModule { }
