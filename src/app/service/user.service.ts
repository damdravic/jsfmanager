import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
 
  public editUser(formData :FormData):Observable<User  | HttpErrorResponse >{
    return this.http.post<User>(`${this.host}/user/update`,formData);
  }
 
  private host  = environment.apiUrl;

 constructor(private http:HttpClient) { }

public getUser():Observable<User [] | HttpErrorResponse >{
  return this.http.get<User[]>(`${this.host}/user/list`);
}

public addUser(formData :FormData):Observable<User  | HttpErrorResponse >{
  return this.http.post<User>(`${this.host}/user/add`,formData);
}

public resetPassword(email : string):Observable<any  | HttpErrorResponse >{
  return this.http.get<any>(`${this.host}/user/resetPassword/${email}`);
}


public createUserFormData(loggedInUsername : string, user:User, profileImage : File): FormData {
  const formData = new FormData();
  formData.append('currentUser',loggedInUsername);
  formData.append('firstName',user.firstName);
  formData.append('lastName',user.lastName);
  formData.append('username',user.username);
  formData.append('email',user.email);
  formData.append('role',user.role);
  formData.append('profileImage',profileImage);
  formData.append('isActive',JSON.stringify(user.active));
  formData.append('isNotLocked',JSON.stringify(user.notLocked));


 return formData;
}

public addUsersToLocalCache(users : User[]) : void {
  localStorage.setItem('users',JSON.stringify(users));
    
}

public getUsersFromLocalCache() : User[] {
  if(localStorage.getItem('users')){
 return JSON.parse(localStorage.getItem('users'));
  }
  return null;
    
}



}