import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Contact } from '../../interfaces/contact';
import { ContactService } from '../../services/contact/contact.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { TitleComponent } from '../../component/title/title.component';
import { LoadingComponent } from '../../component/loading/loading.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatIcon, TitleComponent, LoadingComponent ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  contacts : Contact[] = [];
  isLoading = true;

  constructor (private router: Router, private authService: AuthService, private service: ContactService){}

  ngOnInit(): void {
    this.service.getAllContacts().subscribe((data) => {
      this.contacts = data;
      this.isLoading = false;
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

  async delete(contact : Contact){
    const confirmed = confirm("Sicuro di voler eliminare il contatto?" + contact.name + " " + contact.surname + " " + contact.email + " " + contact.company);
    if (confirmed) {
      this.service.deleteContact(contact.id).subscribe((data) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(["/admin"]);
      });
    }else {
      console.log("Delete operation cancelled");
    }
  }
}
