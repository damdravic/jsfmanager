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
}}