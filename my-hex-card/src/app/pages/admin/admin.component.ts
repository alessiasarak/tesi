import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Contact } from '../../interfaces/contact';
import { ContactService } from '../../services/contact/contact.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  contacts : Contact[] = [];

  constructor (private router: Router, private authService: AuthService, private service: ContactService){}

  ngOnInit(): void {
    this.service.getAllContacts().subscribe((data) => {
      this.contacts = data;
      console.log(this.contacts)
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  addContact(){
    this.router.navigateByUrl("/add-contact");
  }

  async seeContactCards(contactId : number){
    this.router.navigateByUrl("/contact-cards/"+contactId);
  }
}
