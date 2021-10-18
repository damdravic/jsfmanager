import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { NotificationType } from '../enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users :User[];
  private subscriptions : Subscription[]=[];
  public refreshing: boolean;
  public selectedUser : User ; 
  public editUser= new User();
  private currentUsername: string;

  constructor(private authenticationService : AuthenticationService,
              private userService : UserService,
              private notificationService : NotificationService,
              private router : Router ){}
 
              ngOnInit(): void {
                if(this.authenticationService.isUserLoggedIn()){
                this.getUser(true);
              }
                else{
                  this.router.navigateByUrl('/login');
                }
              }

  
  public getUser(showNotification: boolean) {
    this.refreshing = true;
  this.subscriptions.push(
    this.userService.getUser().subscribe(
      (response: User[]) => {
        this.userService.addUsersToLocalCache(response);
        this.users = response;
        console.log(this.users);
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

  public onEditUser(editUser : User ){
    this.editUser = editUser;
    this.currentUsername = editUser.username;
    document.getElementById('openEditUser').click();
  }

  public onSelectUser(selectedUser : User){
      this.selectedUser = selectedUser;
      document.getElementById('openUserInfo').click(); 
  }

  public onUpdateUser(formUser :NgForm) : void{
    const formData = this.userService.createUserFormData(this.currentUsername, this.editUser, null)
    this.subscriptions.push(
      this.userService.editUser(formData).subscribe(

        (response:User) => {
          document.getElementById('edit-user-close').click();
          this.getUser(false);
          formUser.reset();

          this.sendNotification(NotificationType.SUCCESS,`${response.firstName} account was edited successfully`)



        }, (error:HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR,error.error.message);
          
        }
      ));

  }



  public addNewUser(formUser:NgForm):void{
    const formData = this.userService.createUserFormData(null, formUser.value, null)
    this.subscriptions.push(
      this.userService.addUser(formData).subscribe(

        (response:User) => {
          document.getElementById('new-user-close').click();
          this.getUser(false);
          formUser.reset();

          this.sendNotification(NotificationType.SUCCESS,`${response.firstName} account was created successfully`)



        }, (error:HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR,error.error.message);
          
        }
      ));
    
  }


         
  public searchUsers(searchTerm : string): void{
    console.log(searchTerm);
    const results:User[] = [] ;
    for(const user of this.userService.getUsersFromLocalCache()){
      if(user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      user.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      user.userId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ){
       results.push(user);
      }
     }
     this.users = results;
     if(results.length === 0 || !searchTerm){
             this.users = this.userService.getUsersFromLocalCache();
       
     }

  }

  public logout(){
    this.authenticationService.logout();
    window.location.reload();
   
  }


 

}
