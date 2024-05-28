import { Injectable } from '@angular/core';
import { CrudService } from '../crud.service';
import { User } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CrudService<User> {

  constructor(http: HttpClient) {
    super(http, "/auth");
  }

  async login(user: User, token? : string) : Promise<User> {
    //se il token è presente associa la carta
    if(token){
      let response = await lastValueFrom(this.post(user, "/login/"+token));
      return response;
    }
    let response = await lastValueFrom(this.post(user, "/login"));
    
    return response;
  }

  async register(user: User, token : string) : Promise<User> {
    let response = await lastValueFrom(this.post(user, "/register/"+token));
    
    return response;
  }

  public isAuthenticated() : boolean {
    return sessionStorage.getItem('user_id') != undefined && sessionStorage.getItem('user_id')!.length > 0;
  }

  public isAdmin() : boolean {
    return sessionStorage.getItem('role') != undefined && sessionStorage.getItem('role')! == "ADMIN";
  }

  logout(){
    sessionStorage.setItem("user_id", "");
    sessionStorage.setItem("role", "");
    
    this.get("/logout");
  }
}
