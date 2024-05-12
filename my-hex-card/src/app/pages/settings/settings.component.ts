import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from '../../interfaces/card';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  //constructor
  constructor(private service: AuthService, private router: Router, private route: ActivatedRoute, private cardService : CardService){}

  cards : Card[] = [];

  ngOnInit(): void {
    if(localStorage.getItem("role") == "ADMIN") this.router.navigateByUrl("/admin");

    let userId = localStorage.getItem("user_id")
    this.cardService.getCardsByUser(userId!).then(
      (data) => {
        this.cards = data;
      }
    );
  }
  
  logout(){
    this.service.logout();
    this.router.navigateByUrl("/login");
  }
}
