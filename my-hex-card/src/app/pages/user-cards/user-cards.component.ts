import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { CardService } from '../../services/card.service';
import { Card } from '../../interfaces/card';
import { MyButtonComponent } from '../../component/my-button/my-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-cards',
  standalone: true,
  imports: [ MyButtonComponent, CommonModule ],
  templateUrl: './user-cards.component.html',
  styleUrl: './user-cards.component.css'
})
export class UserCardsComponent {
  email : string = "";
  cards : Card[] = [];
  link : string = "http://localhost:4200/card/";

  constructor (private router: Router, private route: ActivatedRoute, private authService: AuthService, private service: UserService, private cardService : CardService){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let userId = params['idUser'];
      this.email = params['email'];
      
      this.cardService.getCardByUser(userId).then(
        (data) => {
          this.cards.push(data);
        }
      );
    });
  }
}
