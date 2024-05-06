import { Component } from '@angular/core';
import { Card } from '../../interfaces/card';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MainComponent } from '../main/main.component';
import { MyButtonComponent } from '../../component/my-button/my-button.component';

@Component({
  selector: 'app-card-style-settings',
  standalone: true,
  imports: [ CommonModule, MatIconModule, ReactiveFormsModule, MyButtonComponent ],
  templateUrl: './card-style-settings.component.html',
  styleUrl: './card-style-settings.component.css'
})
export class CardStyleSettingsComponent {

  //constructor
  constructor(private router: Router, private route: ActivatedRoute, private service: CardService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //let cardId = params['idCard']; 
      this.service.getCard(localStorage.getItem("card")!).subscribe((data) => {
        data.img = 'assets/img/facebook.png';
        
        this.style = data;
        
        this.myMainStyle = "color: " + this.style.text_color + "; background-color: " + this.style.background_color + ";";
        this.myButtonStyle = "background-color: " + this.style.button_color + ";";
        
        this.assignValues(data);
      });
    });
  }

  //properties
  myMainClass : string = "flex flex-col w-96 shadow-xl p-8 rounded-3xl ";
  myButtonClass : string = "add-contact flex h-1/4 ";
  myMainStyle : string = "";
  myButtonStyle : string = "";

  myForm : FormGroup = this.fb.group({
    backgroundColor: [''],
    textColor: [''],
    buttonColor: ['']
  });

  style: Card = {
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

  assignValues(style: Card){
    this.myForm.patchValue({
      backgroundColor: style.background_color,
      textColor: style.text_color,
      buttonColor: style.button_color,
    });
  }

  async onSubmit() {
    this.style.background_color = this.myForm.value.backgroundColor;
    this.style.text_color = this.myForm.value.textColor;
    this.style.button_color = this.myForm.value.buttonColor;

    
    let response = await this.service.putStyleCard(this.style);
    
    //let response = await this.service.putCard(this.card);
    
    if(response) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["/card-style-settings"]);
    }
  }
}
