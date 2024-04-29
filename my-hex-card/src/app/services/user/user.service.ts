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
    return this.get("/"+localStorage.getItem("user_id")!);
  }

  getAllUsers() {
    return this.getList();
  }

  async putUser(user: User) : Promise<User> {
    let response = await lastValueFrom(this.put(user, "/" + localStorage.getItem("user_id")!));
    return response;
  }

  async putPassword(user : User){
    let response = await lastValueFrom(this.put(user, "/password/" + localStorage.getItem("user_id")!));
    return response;
  }
}
