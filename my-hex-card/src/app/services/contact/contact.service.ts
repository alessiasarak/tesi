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
    super(http, "/");
  }

  async create(user: Contact) : Promise<Contact> {
    let response = await lastValueFrom(this.post(user, "auth/create"));
    
    return response;
  }

  getAllContacts() {
    return this.getList("contact");
  }

  deleteContact(idContact: number) {
    return this.delete("contact/"+idContact);
  }
}
