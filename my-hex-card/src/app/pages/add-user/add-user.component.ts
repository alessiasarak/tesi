import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  //constructor
  constructor(private router: Router, private service: AuthService, private fb: FormBuilder){}

  //properties
  myForm : FormGroup = this.fb.group({
    email: [''],
    name: [''],
    surname: [''],
    role: [''],
  });

  user: User = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
    fk_role: { role: 'SINGLE_USER' }
  };

  async onSubmit() {
    this.user.email = this.myForm.value.email;
    this.user.name = this.myForm.value.name;
    this.user.surname = this.myForm.value.surname;
    this.user.fk_role = this.myForm.value.role;
    
    let response = await this.service.create(this.user);
    
    if(response) this.router.navigateByUrl("/admin");
  }
}
