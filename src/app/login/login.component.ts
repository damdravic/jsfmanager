import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { HeaderType } from '../enum/header-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  showLoading :boolean;
  private subscriptions : Subscription[]=[];

  constructor(private router:Router,
              private authenticationService : AuthenticationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()){
      this.router.navigateByUrl('/landing');
    }// else {
      //this.router.navigateByUrl('/login');
   // }
  }
 
public onLogin(user:User) :void {
  this.showLoading = true;
  this.subscriptions.push(
    this.authenticationService.login(user).subscribe(
      (response: HttpResponse<User>) =>{
        const token = response.headers.get(HeaderType.JWT_TOKEN);
        this.authenticationService.saveToken(token);
        this.authenticationService.addUserToLocalCache(response.body);
        this.router.navigateByUrl('/landing');
        this.showLoading =false;

      },
      (errorResponse : HttpErrorResponse) => {
             this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
      })
    )
}


  private sendErrorNotification(notificationType: NotificationType, message: string):void {
    if(message){
      this.notificationService.mynotify(notificationType,message);
    }else{
      this.notificationService.mynotify(notificationType,'AN ERROR OCCURED.PLEASE TRY AGAIN')

    }
  }



  ngOnDestroy():void{
    this.subscriptions.forEach(sub => sub.unsubscribe())

  }

}
