import { Component } from '@angular/core';
import { Card } from '../../interfaces/card';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MyButtonComponent } from '../../component/my-button/my-button.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-card-settings',
  standalone: true,
  imports: [ CommonModule, MatIconModule, ReactiveFormsModule, MyButtonComponent, MyButtonComponent ],
  templateUrl: './card-settings.component.html',
  styleUrl: './card-settings.component.css'
})
export class CardSettingsComponent {
  //constructor
  constructor(private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private service: CardService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.service.getCard(localStorage.getItem("card")!).subscribe((data) => {
        this.card = data;

        this.myMainStyle = "color: " + this.card.text_color + "; background-color: " + this.card.background_color + ";";
        this.myButtonStyle = "background-color: " + this.card.button_color + ";";
        
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
    img: [''],
    title: [''],
    subtitle: [''],
    instagram: [''],
    facebook: [''],
    linkedin: [''],
    whatsapp: [''],
    youtube: [''],
    emails: [''],
    phoneNumbers: [''],
    links: ['']
  });
  myStyleForm : FormGroup = this.fb.group({
    backgroundColor: [''],
    textColor: [''],
    buttonColor: ['']
  });

  card: Card = {
    id: 0,
    title: '',
    subtitle: '',
    img: '',
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
  };

  assignValues(card: Card){
    this.myForm.setValue({
      img: null,
      title: card.title,
      subtitle: card.subtitle,
      instagram: card.instagram,
      facebook: card.facebook,
      linkedin: card.linkedin,
      whatsapp: card.whatsapp,
      youtube: card.youtube,
      emails: card.email.map(value => value.email).join(","),
      phoneNumbers: card.phone_number.map(value => value.number).join(","),
      links: card.link.map(value => value.link).join(",")
    });

    this.myStyleForm.patchValue({
      backgroundColor: card.background_color,
      textColor: card.text_color,
      buttonColor: card.button_color,
    });
  }

  async onSubmit() {
    this.card.title = this.myForm.value.title;
    this.card.subtitle = this.myForm.value.subtitle;
    this.card.instagram = this.myForm.value.instagram;
    this.card.facebook = this.myForm.value.facebook;
    this.card.linkedin = this.myForm.value.linkedin;
    this.card.whatsapp = this.myForm.value.whatsapp;
    this.card.youtube = this.myForm.value.youtube;
    this.card.email = this.myForm.value.emails.split(",").map(function(item: string) {
      return {email: item};
    });
    this.card.phone_number = this.myForm.value.phoneNumbers.split(",").map(function(item: string) {
      return {number: item};
    });
    this.card.link = this.myForm.value.links.split(",").map(function(item: string) {
      return {link: item};
    });
    
    let response = await this.service.putCard(this.card);
    
    if(response) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["/card-settings"]);
    }
  }

  async onStyleSubmit() {
    this.card.background_color = this.myStyleForm.value.backgroundColor;
    this.card.text_color = this.myStyleForm.value.textColor;
    this.card.button_color = this.myStyleForm.value.buttonColor;
    
    let response = await this.service.putStyleCard(this.card);
    
    if(response) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["/card-settings"]);
    }
  }

  async processFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.card.img = reader.result!.toString();
    };
  }
}

