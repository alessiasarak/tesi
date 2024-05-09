import { Component } from '@angular/core';
import { Card } from '../../interfaces/card';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MyButtonComponent } from '../../component/my-button/my-button.component';
import { Email } from '../../interfaces/email';

@Component({
  selector: 'app-card-settings',
  standalone: true,
  imports: [ CommonModule, MatIconModule, ReactiveFormsModule, MyButtonComponent, MyButtonComponent ],
  templateUrl: './card-settings.component.html',
  styleUrl: './card-settings.component.css'
})
export class CardSettingsComponent {
  //constructor
  constructor(private router: Router, private route: ActivatedRoute, private service: CardService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.service.getCard(params['id']!).subscribe((data) => {
        this.card = data;

        this.myMainStyle = "color: " + this.card.text_color + "; background-color: " + this.card.background_color + ";";
        this.myButtonStyle = "background-color: " + this.card.button_color + ";";
        this.myToken=params['id'];
        
        this.assignValues(data);
      });
    });
  }

  //properties
  myMainClass : string = "flex flex-col w-96 shadow-xl p-8 rounded-3xl ";
  myButtonClass : string = "add-contact flex h-1/4 ";
  myMainStyle : string = "";
  myButtonStyle : string = "";

  myToken : string = this.route.snapshot.params['id'];

  myForm : FormGroup = this.fb.group({
    img: [''],
    name: [''],
    surname: [''],
    company: [''],
    function: [''],
    instagram: [''],
    facebook: [''],
    linkedin: [''],
    whatsapp: [''],
    youtube: [''],
    emails:  this.fb.array([ this.fb.control('') ]),
    phoneNumbers: [''],
    links: ['']
  });
  myStyleForm : FormGroup = this.fb.group({
    backgroundColor: [''],
    textColor: [''],
    buttonColor: ['']
  });

  email : Email[] = [];

  get emailControls() {
    return (this.myForm.get('emails') as FormArray).controls;
  }
  addEmail(){
    const emails = this.myForm.get('emails') as FormArray;
    emails.push(this.fb.control(''));
  } 
  removeEmail(index: number) {
    const emails = this.myForm.get('emails') as FormArray;
    emails.removeAt(index);
  }

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
    email: this.email,
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
    console.log(card)
    this.myForm.patchValue({
      img: null,
      name: card.name ?? "",
      surname: card.surname ?? "",
      company: card.company ?? "",
      function: card.function ?? "",
      instagram: card.instagram ?? "",
      facebook: card.facebook ?? "",
      linkedin: card.linkedin ?? "",
      whatsapp: card.whatsapp ?? "",
      youtube: card.youtube ?? "",
      phoneNumbers: card.phone_number?.map(value => value.number).join(",") ?? "",
      links: card.link?.map(value => value.link).join(",") ?? ""
    });

    const emailArray = this.myForm.get('emails') as FormArray;
    emailArray.clear(); // Rimuovi tutti gli elementi precedenti per evitare duplicati
  
    if (card.email && card.email.length > 0) {
      card.email.forEach(email => {
        emailArray.push(this.fb.control(email.email)); // Aggiungi ogni email al FormArray
      });
    } else {
      emailArray.push(this.fb.control(""));
    }

    this.myStyleForm.patchValue({
      backgroundColor: card.background_color,
      textColor: card.text_color,
      buttonColor: card.button_color,
    });
  }

  async onSubmit() {
    this.card.name = this.myForm.value.name;
    this.card.surname = this.myForm.value.surname;
    this.card.company = this.myForm.value.company;
    this.card.function = this.myForm.value.function;
    this.card.instagram = this.myForm.value.instagram;
    this.card.facebook = this.myForm.value.facebook;
    this.card.linkedin = this.myForm.value.linkedin;
    this.card.whatsapp = this.myForm.value.whatsapp;
    this.card.youtube = this.myForm.value.youtube;

    this.card.email = this.myForm.value.emails;

    this.card.phone_number = this.myForm.value.phoneNumbers.split(",").map(function(item: string) {
      return {number: item};
    });
    this.card.link = this.myForm.value.links.split(",").map(function(item: string) {
      return {link: item};
    });

    let response = await this.service.putCard(this.card, this.myToken);
    if(response) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["/card-settings/"+this.myToken]);
    }
    
  }

  async onStyleSubmit() {
    this.card.background_color = this.myStyleForm.value.backgroundColor;
    this.card.text_color = this.myStyleForm.value.textColor;
    this.card.button_color = this.myStyleForm.value.buttonColor;
    this.card.token = this.myToken;
    
    let response = await this.service.putStyleCard(this.card, this.myToken);
    
    if(response) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["/card-settings/"+this.myToken]);
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

