import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SocialMediaFooterComponent } from '../../component/social-media-footer/social-media-footer.component';
import { HamburgerMenuComponent } from '../../component/hamburger-menu/hamburger-menu.component';
import { Card } from '../../interfaces/card';
import { CardService } from '../../services/card.service';
 
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ CommonModule, SocialMediaFooterComponent, HamburgerMenuComponent, HttpClientModule ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  constructor(private service: CardService){}
  
  myCard: Card = {
    id: 0,
    img: '',
    title: '',
    subtitle: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    whatsapp: '',
    youtube: '',

    fk_id_user: 0,
    email: [],
    phone_number: [],
    link: []
  }

  example: Card = {
    id: 0,
    img: 'assets/img/facebook.png',
    title: 'Alessia Sarak',
    subtitle: 'Junior Software Developer',
    instagram: '',
    facebook: '',
    linkedin: '',
    whatsapp: '',
    youtube: '',

    fk_id_user: 0,
    email: [
      { email: "alessia@uno.ch" },
      { email: "alessia@due.ch" },
      { email: "alessia@tre.ch" }
    ],
    phone_number: [
      { phone_number: "+41 76 803 84 97" }
    ],
    link: [
      { link: "www.hexagonswiss.ch" },
      { link: "www.hexcard.ch" }
    ]
  }

  ngOnInit(): void {
    this.assignValue();

    this.service.provadGet();   
  }

  assignValue() : void {
    this.myCard = this.example;
  }

}
