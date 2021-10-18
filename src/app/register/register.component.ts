import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit,OnDestroy {
  
  
  showLoading :boolean;
  private subscriptions : Subscription[]=[];

  constructor(private router:Router,
              private authenticationService : AuthenticationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    console.log("ngOnInit -->" + this.authenticationService.isUserLoggedIn());
    if (this.authenticationService.isUserLoggedIn()){
       
      this.router.navigateByUrl('/user/management');
    }
     
}
 
public onRegister(user:User) :void {
  this.showLoading = false;
  console.log(); 
  this.subscriptions.push(
    this.authenticationService.register(user).subscribe(
      response =>{
      
        this.showLoading =false;
        this.sendNotification(NotificationType.SUCCESS,"a new account has been created.");
        this.router.navigateByUrl("/login")

      },
      (errorResponse : HttpErrorResponse) => {
        console.log(errorResponse);
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      })
    )
}


  private sendNotification(notificationType: NotificationType, message: string):void {
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
