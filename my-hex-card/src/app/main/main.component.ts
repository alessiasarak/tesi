import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SocialMediaFooterComponent } from '../social-media-footer/social-media-footer.component';
import { HamburgerMenuComponent } from '../hamburger-menu/hamburger-menu.component';
 
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ CommonModule, SocialMediaFooterComponent, HamburgerMenuComponent ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  img: string = "assets/img/facebook.png";
  title: string = "Alessia Sarak";
  subtitle: string = "Junior Software Developer";
  email: string = "alessia@hexagonswiss.ch";
  number: string = "+41 91 822 80 00"; 
  websites: string[] = [
    "www.hexagonswiss.ch",
    "www.hexcard.ch"
  ];
}
