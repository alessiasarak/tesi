import { Component } from '@angular/core';
import { Card } from '../../interfaces/card';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MyButtonComponent } from '../../component/my-button/my-button.component';
import { Email } from '../../interfaces/email';
import { PhoneNumber } from '../../interfaces/phone-number';
import { Link } from '../../interfaces/link';
import { Address } from '../../interfaces/address';
import { TitleComponent } from '../../component/title/title.component';

@Component({
  selector: 'app-card-settings',
  standalone: true,
  imports: [ CommonModule, MatIconModule, ReactiveFormsModule, MyButtonComponent, TitleComponent ],
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

  style = false;


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
    emails: this.fb.array([ this.fb.control('') ]),
    phoneNumbers: this.fb.array([ this.fb.control('') ]),
    links: this.fb.array([ this.fb.control('') ]),

   addresses: this.fb.array([])
   
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

  phoneNumber : PhoneNumber[] = [];

  get phoneNumberControls() {
    return (this.myForm.get('phoneNumbers') as FormArray).controls;
  }
  addPhoneNumber(){
    const phoneNumbers = this.myForm.get('phoneNumbers') as FormArray;
    phoneNumbers.push(this.fb.control(''));
  } 
  removePhoneNumber(index: number) {
    const phoneNumbers = this.myForm.get('phoneNumbers') as FormArray;
    phoneNumbers.removeAt(index);
  }


  link : Link[] = [];

  get linkControls() {
    return (this.myForm.get('links') as FormArray).controls;
  }
  addLink(){
    const links = this.myForm.get('links') as FormArray;
    links.push(this.fb.control(''));
  } 
  removeLink(index: number) {
    const links = this.myForm.get('links') as FormArray;
    links.removeAt(index);
  }


  address : Address[] = [];
  
  street_name = "street_name";
  street_number = "street_number";
  cap = "cap";
  city = "city";
  nation = "nation";

  get addresses(): FormArray {
    return this.myForm.get('addresses') as FormArray;
  }

  addAddress() {
    const addresses = this.myForm.get('addresses') as FormArray;

    addresses.push(
      this.fb.group({
        [this.street_name]: [''],
        [this.street_number]: [''],
        [this.cap]: [''],
        [this.city]: [''],
        [this.nation]: ['']
      })
    );
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
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
    phone_number: this.phoneNumber,
    link: this.link,
    address: this.address,
    active: false,
    background_color: '',
    text_color: '',
    button_color: '',
    token: ''
  };

  assignValues(card: Card){
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
      youtube: card.youtube ?? ""
    });

    const phoneNumberArray = this.myForm.get('phoneNumbers') as FormArray;
    phoneNumberArray.clear();
  
    if (card.phone_number && card.phone_number.length > 0) {
      card.phone_number.forEach(phoneNumber => {
        phoneNumberArray.push(this.fb.control(phoneNumber.number)); 
      });
    } else {
      phoneNumberArray.push(this.fb.control(""));
    }

    const emailArray = this.myForm.get('emails') as FormArray;
    emailArray.clear(); 
  
    if (card.email && card.email.length > 0) {
      card.email.forEach(email => {
        emailArray.push(this.fb.control(email.email));
      });
    } else {
      emailArray.push(this.fb.control(""));
    }

    const linkArray = this.myForm.get('links') as FormArray;
    linkArray.clear(); 
  
    if (card.link && card.link.length > 0) {
      card.link.forEach(link => {
        linkArray.push(this.fb.control(link.link));
      });
    } else {
      linkArray.push(this.fb.control(""));
    }

    const addressArray = this.myForm.get('addresses') as FormArray;
    addressArray.clear(); 
  
    if (card.address && card.address.length > 0) {
      card.address.forEach(address => {
        addressArray.push(
          this.fb.group({
            street_name: address.street_name ?? [''],
            street_number: address.street_number ?? [''],
            cap: address.cap ?? [''],
            city: address.city ?? [''],
            nation: address.nation ?? ['']
          })
        );
      });
    } else {
      addressArray.push(
        this.fb.group({
          street_name: [''],
          street_number: [''],
          cap: [''],
          city: [''],
          nation: ['']
        })
      );
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
    this.card.phone_number = this.myForm.value.phoneNumbers;
    this.card.link = this.myForm.value.links;
    this.card.address = this.myForm.value.addresses;
    
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

  setStyleFalse(){
    this.style = false;
  }

  setStyleTrue(){
    this.style = true;
  }
}