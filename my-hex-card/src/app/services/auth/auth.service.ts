import { Injectable } from '@angular/core';
import { CrudService } from '../crud.service';
import { User } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CrudService<User> {

  constructor(http: HttpClient) {
    super(http, "/auth");
  }

  login() : boolean {
    return true;
  }

  register(user: User) : boolean {
    console.log("REGISTER");
    this.post(user, "/register").subscribe((data) => {
      console.log(data)
    });
    return true;
  }
}
