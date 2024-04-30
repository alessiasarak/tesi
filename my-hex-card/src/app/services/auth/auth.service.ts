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

  async login(user: User) : Promise<User> {
    let response = await lastValueFrom(this.post(user, "/login"));
    
    return response;
  }

  async create(user: User) : Promise<User> {
    let response = await lastValueFrom(this.post(user, "/create"));
    
    return response;
  }

  async register(user: User) : Promise<User> {
    let response = await lastValueFrom(this.post(user, "/register"));
    
    return response;
  }

  public isAuthenticated() : boolean {
    return localStorage.getItem('user_id') != undefined && localStorage.getItem('user_id')!.length > 0;
  }

  public isAdmin() : boolean {
    return localStorage.getItem('role') != undefined && localStorage.getItem('role')! == "ADMIN";
  }

  logout(){
    localStorage.setItem("user_id", "");
    localStorage.setItem("role", "");
    
    this.get("/logout");
  }
}
