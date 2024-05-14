import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { Card } from '../../interfaces/card';
import { MyButtonComponent } from '../../component/my-button/my-button.component';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';

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
  link : string = "https://myhexcard.com/#/card/";
  idContact : string = "";

  constructor (private router: Router, private route: ActivatedRoute, private cardService : CardService, private clipboard: Clipboard){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idContact = params['idContact'];
      
      this.cardService.getCardsByContact(this.idContact).then(
        (data) => {
          this.cards = data;
        }
      );
    });
  }

  addCard(){
    console.log("Aggiungi di una carta");
    this.cardService.postCard(this.idContact).then(
      (data) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(["/contact-cards/"+this.idContact]);
      }
    );
  }

  copy(data:string){
    this.clipboard.copy(data);
  }
}
