import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private autenticationService : AuthenticationService, 
    private router:Router,private notificationService : NotificationService ) { }
    
  

  collapse : boolean = false;
  user:User;

  ngOnInit(): void {

     this.user = this.autenticationService.getUserFromLocalCache();

  }

@Output() collapseEvent : EventEmitter<boolean>  = new  EventEmitter<boolean>();

  toggleSideBar(){
    this.collapse = !this.collapse;
    this.collapseEvent.emit(this.collapse);
  }

  onLogOut(){
    this.autenticationService.logout();
    this.router.navigate(['/login']);
    this.notificationService.mynotify(NotificationType.SUCCESS, "You've successifful LogOut")

  }

}
