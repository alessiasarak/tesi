import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SocialMediaFooterComponent } from '../../component/social-media-footer/social-media-footer.component';
import { HamburgerMenuComponent } from '../../component/hamburger-menu/hamburger-menu.component';
import { Card } from '../../interfaces/card';
import { CardService } from '../../services/card.service';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../services/theme/theme.service';
import { MatIconModule } from '@angular/material/icon';
 
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ CommonModule, SocialMediaFooterComponent, HamburgerMenuComponent, HttpClientModule, MatIconModule ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  constructor(private service: CardService, private route: ActivatedRoute, private themeService: ThemeService){}
  
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
  
  ngOnInit(): void {
    this.themeService.setBackgroundColor("#fff");
    this.themeService.setTextColor("#000");
    this.themeService.setButtonColor("#fff");
    
    this.route.params.subscribe(params => {
      let cardId = params['idCard']; 
      this.service.getCard(cardId).subscribe((data) => {
        data.img = 'assets/img/facebook.png';
        
        this.myCard = data;
      });
    });
  }
}
