import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SocialMediaFooterComponent } from '../../component/social-media-footer/social-media-footer.component';
import { HamburgerMenuComponent } from '../../component/hamburger-menu/hamburger-menu.component';
import { Card } from '../../interfaces/card';
import { CardService } from '../../services/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import vCardsJS from 'vcards-js';
 
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ CommonModule, SocialMediaFooterComponent, HamburgerMenuComponent, HttpClientModule, MatIconModule ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  constructor(private service: CardService, private route: ActivatedRoute, private router: Router){}
  
  myMainClass : string = "";
  myButtonClass : string = "";
  myMainStyle : string = "";
  myButtonStyle : string = "";

  myCard: Card = {
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

    email: [],
    phone_number: [],
    link: [],
    address: [],

    active: false,
    background_color: '',
    text_color: '',
    button_color: '',

    fk_id_contact: 0,
    fk_id_user: 0,
    token: ''
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let cardId = params['idCard']; 
      this.service.getCard(cardId).subscribe((data) => {
        if(!data.active) this.router.navigateByUrl("/register/"+cardId);
        this.myCard = data;
        
        this.myMainClass = "content h-full";
        this.myButtonClass = "add-contact flex h-1/4 text-[#fff]" + " bg-[" + this.myCard.button_color + "]";

        this.myMainStyle = "color: " + this.myCard.text_color + "; background-color: " + this.myCard.background_color + ";";
        this.myButtonStyle = "background-color: " + this.myCard.button_color + ";";
      });
    });
  }

  addToContact(){
    let file = new Blob([ this.vCardCreator() ], {type: '.vcf'});
    let a = document.createElement("a");
    let url = URL.createObjectURL(file);
    a.href = url;
    a.download = this.myCard.company + '.vcf';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
  }
  
  private vCardCreator() {
    const vCard = vCardsJS();

    vCard.firstName = this.myCard.name;
    vCard.lastName = this.myCard.surname;
    vCard.organization = this.myCard.company;
    vCard.title = this.myCard.function;

    vCard.workUrl = this.myCard.link.length > 0 ? this.myCard.link[0].link : '';
    vCard.workEmail = this.myCard.email.length > 0 ? this.myCard.email[0].email : '';
    vCard.workPhone = this.myCard.phone_number.length > 0 ? this.myCard.phone_number[0].number : '';

    let otherPhoneNumbers = this.myCard.phone_number.slice(1);
    let phoneNumber : string[] = [];
    otherPhoneNumbers.forEach(element => {
      phoneNumber.push(element.number);
    });
    vCard.pagerPhone = this.myCard.phone_number.length > 0 ? phoneNumber : '';

    let otherEmails = this.myCard.email.slice(1);
    let email : string[] = [];
    otherEmails.forEach(element => {
      email.push(element.email);
    });
    vCard.otherEmail = this.myCard.email.length > 0 ? email : '';

    let otherLinks = this.myCard.link.slice(1);
    let link : string[] = [];
    otherLinks.forEach(element => {
      link.push(element.link);
    });
    vCard.url = this.myCard.link.length > 0 ? link[0] : '';
    
    vCard.workAddress.street = this.myCard.address.length > 0 ? this.myCard.address[0].street_name : '';
    vCard.workAddress.city = this.myCard.address.length > 0 ? this.myCard.address[0].city : '';
    vCard.workAddress.stateProvince = this.myCard.address.length > 0 ? this.myCard.address[0].nation : '';
    vCard.workAddress.postalCode = this.myCard.address.length > 0 ? this.myCard.address[0].cap.toString() : '';

    let img = this.myCard.img.split(",");   
    console.log(img);
    vCard.photo.embedFromString(img[1], img[0]);

    return vCard.getFormattedString();
  }
}
