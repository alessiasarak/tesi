import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Contact } from '../../interfaces/contact';
import { ContactService } from '../../services/contact/contact.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatIcon ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  contacts : Contact[] = [];

  constructor (private router: Router, private authService: AuthService, private service: ContactService){}

  ngOnInit(): void {
    this.service.getAllContacts().subscribe((data) => {
      this.contacts = data;
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

  async delete(contactId : number){
    //this.router.navigateByUrl("/contact-cards/"+contactId);
    const confirmed = confirm("Are you sure you want to delete this contact?");
    if (confirmed) {
      console.log("Deleting contact with id: ", contactId);
      this.service.deleteContact(contactId).subscribe((data) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(["/admin"]);
      });
      // Perform the delete operation
      // this.router.navigateByUrl("/contact-cards/"+contactId);
    }
  }
}
