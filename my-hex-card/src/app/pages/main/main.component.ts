import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SocialMediaFooterComponent } from '../../component/social-media-footer/social-media-footer.component';
import { HamburgerMenuComponent } from '../../component/hamburger-menu/hamburger-menu.component';
import { Card } from '../../interfaces/card';
import { CardService } from '../../services/card.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private service: CardService, private route: ActivatedRoute, private themeService: ThemeService, private router: Router){}
  

  myMainClass : string = "";
  myButtonClass : string = "";
  myMainStyle : string = "";
  myButtonStyle : string = "";

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
    link: [],
    active: false,
    background_color: '',
    text_color: '',
    button_color: ''
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let cardId = params['idCard']; 
      this.service.getCard(cardId).subscribe((data) => {
        data.img = 'assets/img/facebook.png';
        
        if(!data.active) this.router.navigateByUrl("/register");
        this.myCard = data;
        
        this.myMainClass = "content h-full";
        this.myButtonClass = "add-contact flex h-1/4 text-[#fff]" + " bg-[" + this.myCard.button_color + "]";

        this.myMainStyle = "color: " + this.myCard.text_color + "; background-color: " + this.myCard.background_color + ";";
        this.myButtonStyle = "; background-color: " + this.myCard.button_color + ";";
      });
    });
  }
}
