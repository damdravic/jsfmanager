import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Injectable({providedIn: 'root'})

export class AuthenticationGuard implements CanActivate {
  constructor(private authentication : AuthenticationService,private router :Router,
              private notificationService : NotificationService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean{
    if(this.authentication.isUserLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    this.notificationService.mynotify(NotificationType.ERROR, 'You need to login'.toUpperCase())
    return false;
    
  }
  
}
