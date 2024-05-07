import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyButtonComponent } from '../../component/my-button/my-button.component';
import { Contact } from '../../interfaces/contact';
import { ContactService } from '../../services/contact/contact.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ ReactiveFormsModule, MyButtonComponent ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  //constructor
  constructor(private router: Router, private service: AuthService, private contactService: ContactService, private fb: FormBuilder){}

  //properties
  myForm : FormGroup = this.fb.group({
    email: [''],
    name: [''],
    surname: [''],
    role: [''],
  });

  contact: Contact = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    company: ''
  };

  async onSubmit() {
    this.contact.email = this.myForm.value.email;
    this.contact.name = this.myForm.value.name;
    this.contact.surname = this.myForm.value.surname;
    this.contact.company = this.myForm.value.company;
    
    let response = await this.contactService.create(this.contact);
    console.log(response);
    
    if(response) this.router.navigateByUrl("/contact-cards/"+response.id+"/"+response.email);
  }
}
