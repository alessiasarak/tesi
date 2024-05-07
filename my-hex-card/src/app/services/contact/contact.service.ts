import { Injectable } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { CrudService } from '../crud.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends CrudService<Contact>  {
  constructor(http: HttpClient) {
    super(http, "/auth");
  }

  async create(user: Contact) : Promise<Contact> {
    let response = await lastValueFrom(this.post(user, "/create"));
    
    return response;
  }
}
