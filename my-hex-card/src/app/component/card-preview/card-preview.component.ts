import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-card-preview',
  standalone: true,
  imports: [ CommonModule, MatIconModule ],
  templateUrl: './card-preview.component.html',
  styleUrl: './card-preview.component.css'
})
export class CardPreviewComponent {
  @Input() card: Card = {
    id: 0,
    img: '',
    name: '',
    surname: '',
    company: '',
    function: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    whatsapp: '',
    youtube: '',
    token: '',
    active: false,
    fk_id_user: 0,
    fk_id_contact: 0,
    email: [],
    phone_number: [],
    link: [],
    address: [],
    background_color: '',
    text_color: '',
    button_color: ''
  };

  myMainClass : string = "flex flex-col w-full shadow-xl p-8 rounded-3xl ";
  myButtonClass : string = "add-contact flex h-1/4 ";
  myMainStyle : string = "";
  myButtonStyle : string = "";

  ngOnInit(): void {
    this.myMainStyle = "color: " + this.card.text_color + "; background-color: " + this.card.background_color + ";";
    this.myButtonStyle = "background-color: " + this.card.button_color + ";";
  }
}
