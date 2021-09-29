import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { NotificationType } from '../enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users :User[];
  private subscriptions : Subscription[]=[];
  public refreshing: boolean;

  constructor(private authenticationService : AuthenticationService,
              private userService : UserService,
              private notificationService : NotificationService){ }
 
              ngOnInit(): void {
                this.getUser(true);
              }

  
  public getUser(showNotification: boolean) {
    this.refreshing = true;
  this.subscriptions.push(
    this.userService.getUser().subscribe(
      (response: User[]) => {
        //this.userService.addUsersToLocalCache(response);
        this.users = response;
        this.refreshing =false;
        if(showNotification){
             this.sendNotification(NotificationType.SUCCESS,`${response.length} user(s) loaded successfully `)
        }
      },(error:HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR,error.error.message);
        this.refreshing =false;
      }
    )
  );
  }          

  private sendNotification(notificationType: NotificationType, message: string):void {
    if(message){
      this.notificationService.mynotify(notificationType,message);
    }else{
      this.notificationService.mynotify(notificationType,'AN ERROR OCCURED.PLEASE TRY AGAIN')

    }
  }


 

}
