import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host  = environment.apiUrl;
  private token: string;
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService;



  constructor(private http:HttpClient) { }

  public  login(user:User):Observable<User>{
    return this.http.post<HttpResponse<any>>(`${this.host}/user/login`,user,{observe:'response'});
  }

  public  register(user:User):Observable<User>{
    return this.http.post<User | HttpErrorResponse >(`${this.host}/user/register`,user);
  }

  public  logout(): void{
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public  saveToken(token: string ): void{
    this.token = token;
    localStorage.setItem('token',token);
  
  }

  public  addUserToLocalCache(user: User ): void{
    localStorage.setItem('user',JSON.stringify(user));
  
  }

  public  getUserFromLocalCache(): User{
    return JSON.parse(localStorage.getItem('user')) ;
  
  }

  public  loadToken(): void{
    this.token = localStorage.getItem('token');
  }

  public  getToken(): string{
    return this.token ;
  }

  public  isUserLoggedIn(): boolean{
   this.loadToken();
   console.log("isUserLoggedIn() pas 1   token->" + this.token);
   if(this.token != null && this.token != '') {
    console.log("isUserLoggedIn() pas 2")
     if(this.jwtHelper.decodeToken(this.token).sub != null ){
      console.log("isUserLoggedIn() pas 3")
      console.log(!this.jwtHelper.isTokenExpired(this.token));
       if(!this.jwtHelper.isTokenExpired(this.token)){
        console.log("isUserLoggedIn() pas 4")
         this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
         console.log(this.loggedInUsername);
         return true;
       }
     }

   } else {
     this.logout();
     return false;
   }
  }






}
