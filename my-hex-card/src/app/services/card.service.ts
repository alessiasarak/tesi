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
    return this.get(idCard);
  }

  getAUserCard() {
    return this.get("a-card/" + sessionStorage.getItem("user_id"));
  }

  async getCardsByContact(idContact : string) : Promise<Card[]> {
    return await lastValueFrom(this.getList ("contact/ " + idContact));
  }

  async getCardsByUser(idUser : string) {
    return await lastValueFrom(this.getList("user/ " + idUser));
  }

  async putCard(card: Card, token: string) : Promise<Card | null> {
    let response = await lastValueFrom(this.put(card, "update/" + sessionStorage.getItem("user_id") + "/" +token));
    return response;
  }

  async putStyleCard(card: Card, token: string) : Promise<Card | null> {
    let response = await lastValueFrom(this.put(card, "update/style/" + sessionStorage.getItem("user_id") + "/" +token));
    return response;
  }

  async putStyleAllCard(card: Card) : Promise<Card | null> {
    let response = await lastValueFrom(this.put(card, "all-style/" + sessionStorage.getItem("user_id")));
    return response;
  }

  async postCard(idContact : string, card : Card){
    let response = await lastValueFrom(this.post(card, idContact));
    return response;
  }

  async updateNameSurnameCard(card: Card, token : string) : Promise<Card | null> {
    let response = await lastValueFrom(this.put(card, "name-surname/update/"+token));
    return response;
  }

  async associateCard(card : Card){
    let userId = sessionStorage.getItem("user_id");
    let response = await lastValueFrom(this.put(card, "associate/"+userId));
    return response;
  }
}
