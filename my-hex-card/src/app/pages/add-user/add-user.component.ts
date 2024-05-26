import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyButtonComponent } from '../../component/my-button/my-button.component';
import { Contact } from '../../interfaces/contact';
import { ContactService } from '../../services/contact/contact.service';
import { LoadingComponent } from '../../component/loading/loading.component';
import { TitleComponent } from '../../component/title/title.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ ReactiveFormsModule, MyButtonComponent, LoadingComponent, TitleComponent, CommonModule ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  //constructor
  constructor(private router: Router, private contactService: ContactService, private fb: FormBuilder){}

  //properties
  myForm : FormGroup = this.fb.group({
    email: [''],
    name: [''],
    surname: [''],
    company: [''],
  });

  contact: Contact = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    company: ''
  };
  isLoading = false;
  isVisible = false;

  async onSubmit() {
    this.isLoading = true;
    this.contact.email = this.myForm.value.email;
    this.contact.name = this.myForm.value.name;
    this.contact.surname = this.myForm.value.surname;
    this.contact.company = this.myForm.value.company;
    
    this.contactService.create(this.contact)
    .then((response) => {
      this.router.navigateByUrl("/contact-cards/"+response.id);
    })
    .catch((error) => {
      this.isVisible = true;
      this.isLoading = false;
    });
    
  }
}
