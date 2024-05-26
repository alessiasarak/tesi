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
import { TitleComponent } from '../../component/title/title.component';
import { LoadingComponent } from '../../component/loading/loading.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-cards',
  standalone: true,
  imports: [ MyButtonComponent, CommonModule, QRCodeModule, MatIconModule, TitleComponent, LoadingComponent, ReactiveFormsModule ],
  templateUrl: './user-cards.component.html',
  styleUrl: './user-cards.component.css'
})
export class UserCardsComponent {
  email : string = "";
  cards : Card[] = [];
  link : string = "http://localhost:4200/card/";
  idContact : string = "";
  isVisible = false;

  backgroundColor: string = "#ffffff00";
  codeColor: string = "#fff";


  isLoading = true;
  constructor (private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private cardService : CardService, private clipboard: Clipboard){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idContact = params['idContact'];
      
      this.cardService.getCardsByContact(this.idContact).then(
        (data) => {
          this.cards = data;
          this.isLoading = false;
        }
      );
    });
  }

  isVisibleAddCard = false;

  addCardVisibilty(){
    this.isVisibleAddCard = !this.isVisibleAddCard;
  }
  addCard(){
    /*this.isLoading = true;
    this.cardService.postCard(this.idContact).then(
      (data) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.isLoading = false;
        this.router.navigate(["/contact-cards/"+this.idContact]);
      }
    );*/
  }
  myForm : FormGroup = this.fb.group({
    name: [''],
    surname: ['']
  });

  card: Card = {
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
  }
  async onSubmit() {
    this.isLoading = true;
    this.card.name = this.myForm.value.name;
    this.card.surname = this.myForm.value.surname;

    this.cardService.postCard(this.idContact, this.card).then(
      (data) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.isLoading = false;
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
