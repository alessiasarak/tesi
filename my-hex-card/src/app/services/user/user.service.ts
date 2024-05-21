import { Injectable } from '@angular/core';
import { CrudService } from '../crud.service';
import { User } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {

  constructor(http: HttpClient) {
    super(http, "/user");
  }

  getUser() {
    return this.get("/" + localStorage.getItem("user_id")!);
  }

  async putUser(user: User) : Promise<User> {
    let response = await lastValueFrom(this.put(user, "/" + localStorage.getItem("user_id")!));
    return response;
  }

  async putPassword(user : User){
    let response = await lastValueFrom(this.put(user, "/password/" + localStorage.getItem("user_id")!));
    return response;
  }

  async putPasswordToReset(user : User, token : string){
    let response = await lastValueFrom(this.put(user, "/reset/" + token));
    return response;
  }

  async sendEmailToResetPassword(user : User){
    let response = await lastValueFrom(this.post(user, "/reset"));
    return response;
  }
}
