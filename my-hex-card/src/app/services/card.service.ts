import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Card } from '../interfaces/card';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService extends CrudService<Card> {

  constructor(http: HttpClient) {
    super(http, "/card/");
  }

  getCard(idCard : string) {
    localStorage.setItem("idCard", idCard.toString());
    return this.get(idCard.toString());
  }

  async putCard(card: Card) : Promise<Card | null> {
    let idCard = localStorage.getItem("idCard");
    if(idCard != undefined){
      let response = await lastValueFrom(this.put(card, idCard + "/" + localStorage.getItem("user_id")));
      return response;
    }
    return null;
  }

  async putStyleCard(card: Card) : Promise<Card | null> {
    let idCard = localStorage.getItem("idCard");
    if(idCard != undefined){
      let response = await lastValueFrom(this.put(card, "style/" + idCard + "/" + localStorage.getItem("user_id")));
      return response;
    }
    return null;
  }
}
