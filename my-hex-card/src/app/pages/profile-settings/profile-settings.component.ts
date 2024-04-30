import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export class ProfileSettingsComponent {
  //constructor
  constructor(private router: Router, private service: UserService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.service.getUser().subscribe((data) => {
      console.log(data);
      this.assignValues(data);
    });
  }

  //properties
  myProfileForm : FormGroup = this.fb.group({
    name: [''],
    surname: [''],
    email: [''],
  });
  myPasswordForm : FormGroup = this.fb.group({
    password: [''],
    newPassword: [''],
    repeatedPassword: [''],
  });

  user : User = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
    fk_role: { role: "SINGLE_USER" }
  }

  assignValues(user: User){
    this.myProfileForm.setValue({
      name: user.name,
      surname: user.surname,
      email: user.email,
    });

    console.log(this.myProfileForm);
  }

  async onProfileSubmit() {
    this.user.name = this.myProfileForm.value.name;
    this.user.surname = this.myProfileForm.value.surname;
    this.user.email = this.myProfileForm.value.email;
    
    let response = await this.service.putUser(this.user);
    
    if(response) this.router.navigateByUrl("/settings");
  }

  async onPasswordSubmit() {
    this.user.password = this.myPasswordForm.value.newPassword;
    
    let response = await this.service.putPassword(this.user);
    
    if(response) this.router.navigateByUrl("/settings");
  }
}
