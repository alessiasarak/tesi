import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Card } from '../../interfaces/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MyButtonComponent } from '../../component/my-button/my-button.component';
import { TitleComponent } from '../../component/title/title.component';
import { LoadingComponent } from '../../component/loading/loading.component';
import { CardPreviewComponent } from '../../component/card-preview/card-preview.component';
import { SubtitleComponent } from '../../component/subtitle/subtitle.component';

@Component({
  selector: 'app-set-all-style-cards',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, MatIconModule, MyButtonComponent, TitleComponent, SubtitleComponent, LoadingComponent, CardPreviewComponent ],
  templateUrl: './set-all-style-cards.component.html',
  styleUrl: './set-all-style-cards.component.css'
})
export class SetAllStyleCardsComponent {
  constructor(private router: Router, private route: ActivatedRoute, private service: CardService, private fb: FormBuilder){}

  isLoading = true;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.service.getAUserCard().subscribe((data) => {
        this.card = {
          id: data.id,
          name: 'Esempio',
          surname: 'Esempio',
          company: 'Esempio',
          function: 'Esempio',
          img: data.img,
          instagram: '',
          facebook: '',
          linkedin: '',
          whatsapp: '',
          youtube: '',
          fk_id_user: 0,
          fk_id_contact: 0,
          email: [ { id: 0, label: "", email: "Esempio"} ],
          phone_number: [],
          link: [],
          address: [],
          active: false,
          background_color: data.background_color,
          text_color: data.text_color,
          button_color: data.button_color,
          token: ''
        }

        this.myMainStyle = "color: " + this.card.text_color + "; background-color: " + this.card.background_color + ";";
        this.myButtonStyle = "background-color: " + this.card.button_color + ";";
        
        this.assignValues(this.card);
        this.isLoading = false;
      });
    });
  }
  
  myMainClass : string = "flex flex-col w-96 shadow-xl p-8 rounded-3xl ";
  myButtonClass : string = "add-contact flex h-1/4 ";
  myMainStyle : string = "";
  myButtonStyle : string = "";
  
  myStyleForm : FormGroup = this.fb.group({
    img: [''],
    backgroundColor: [''],
    textColor: [''],
    buttonColor: ['']
  });

  
  card: Card = {
    id: 0,
    name: '',
    surname: '',
    company: '',
    function: '',
    img: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    whatsapp: '',
    youtube: '',
    fk_id_user: 0,
    fk_id_contact: 0,
    email: [],
    phone_number: [],
    link: [],
    address: [],
    active: false,
    background_color: '',
    text_color: '',
    button_color: '',
    token: ''
  };

  assignValues(card: Card){
    this.myStyleForm.patchValue({
      img: null,
      backgroundColor: card.background_color,
      textColor: card.text_color,
      buttonColor: card.button_color,
    });
  }

  async onStyleSubmit() {
    this.card.background_color = this.myStyleForm.value.backgroundColor;
    this.card.text_color = this.myStyleForm.value.textColor;
    this.card.button_color = this.myStyleForm.value.buttonColor;
    
    let response = await this.service.putStyleAllCard(this.card);
    
    if(response) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["/card-settings/style/set-all-style-cards"]);
    }
  }

  
  async processFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.card.img = reader.result!.toString();
        this.isLoading = false;
    };
  }
}
