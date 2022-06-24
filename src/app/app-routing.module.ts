import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { LandingPageComponent } from './layouts/landing-page/landing-page.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DefaultComponent } from './layouts/default/default.component';
import { TablePageComponent } from './layouts/table-page/table-page.component';
import { CarComponent } from './car/car.component';
import { WorkshopComponent } from './modules/workshop/workshop.component';
import { MainPageComponent } from './layouts/main-page/main-page.component';



const routes: Routes = [
  {path:'login',component: LoginComponent },
  {path:'register', component: RegisterComponent},
  {path:'landing',component:LandingPageComponent},
  
  {path:'default', component:DefaultComponent,children :[
    { path:'',component:DashboardComponent },
    {path:'user',component:UserComponent},
    {path:'cars',component:CarComponent},
    {path:'workshop',component:WorkshopComponent}
   
  ]},

  {path:'mainPage', component:MainPageComponent,children :[
    { path:'',component:DashboardComponent },
    {path:'user',component:UserComponent},
    {path:'cars',component:CarComponent},
    {path:'workshop',component:WorkshopComponent}
   
  ]},

  {path:'tablePage',component:TablePageComponent,children:[
     {path:'user',component:UserComponent},
     {path:'cars',component:CarComponent}
   ]},


   {path:'user', component:UserComponent},

  {path:'', redirectTo:'/login',pathMatch:'full'}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
