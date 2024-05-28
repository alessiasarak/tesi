import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from '../../interfaces/card';
import { CardService } from '../../services/card.service';
import { CardPreviewComponent } from '../../component/card-preview/card-preview.component';
import Swiper from 'swiper';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../component/title/title.component';
import { LoadingComponent } from '../../component/loading/loading.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ CommonModule, CardPreviewComponent, TitleComponent, LoadingComponent ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SettingsComponent {
  //constructor
  constructor(private service: AuthService, private router: Router, private cardService : CardService){}

  cards : Card[] = [];
  isLoading = true;

  ngOnInit(): void {
    if(sessionStorage.getItem("role") == "ADMIN") this.router.navigateByUrl("/admin");

    let userId = sessionStorage.getItem("user_id")
    this.cardService.getCardsByUser(userId!).then(
      (data) => {
        this.cards = data;
        this.isLoading = false;
      }
    );
  }
  
  logout(){
    this.service.logout();
    this.router.navigateByUrl("/login");
  }

  viewDetailCard(token: string){
    this.router.navigateByUrl("/card-settings/"+token);
  }
}
