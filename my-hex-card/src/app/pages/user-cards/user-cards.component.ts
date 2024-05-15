import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { Card } from '../../interfaces/card';
import { MyButtonComponent } from '../../component/my-button/my-button.component';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-cards',
  standalone: true,
  imports: [ MyButtonComponent, CommonModule, QRCodeModule, MatIconModule ],
  templateUrl: './user-cards.component.html',
  styleUrl: './user-cards.component.css'
})
export class UserCardsComponent {
  email : string = "";
  cards : Card[] = [];
  link : string = "http://localhost:4200/#/card/";
  idContact : string = "";
  isVisible = false;

  backgroundColor: string = "#ffffff00";
  codeColor: string = "#000000";

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

  async copy(data:string){
    this.clipboard.copy(data);
    this.isVisible = true;
    await this.delay(3000);
    this.isVisible = false;
  }

  setCardUrl(url: SafeUrl, i: number){
    this.cards[i].qrCode = url;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  changeCodeColor(event : any){
    this.codeColor = event.target.value;
    console.log(this.codeColor)
  }

  changeBackgroundColor(event : any){
    this.backgroundColor = event.target.value;
    console.log(this.backgroundColor)
  }
}
