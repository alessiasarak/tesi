import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Card } from '../interfaces/card';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService extends CrudService<Card> {

  constructor(http: HttpClient) {
    super(http, "/card/");
  }

  getCard(idCard : number) {
    return this.get(idCard.toString());
  }
}
