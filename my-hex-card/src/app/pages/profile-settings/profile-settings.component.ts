import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { MyButtonComponent } from '../../component/my-button/my-button.component';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [ ReactiveFormsModule, MyButtonComponent ],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export class ProfileSettingsComponent {
  //constructor
  constructor(private router: Router, private service: UserService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.service.getUser().subscribe((data) => {
      this.assignValues(data);
    });
  }

  //properties
  myProfileForm : FormGroup = this.fb.group({
    email: [''],
  });
  myPasswordForm : FormGroup = this.fb.group({
    password: [''],
    newPassword: [''],
    repeatedPassword: [''],
  });

  user : User = {
    id: 0,
    email: '',
    password: '',
    fk_role: { role: "USER" }
  }

  assignValues(user: User){
    this.myProfileForm.setValue({
      email: user.email,
    });

    console.log(this.myProfileForm);
  }

  async onProfileSubmit() {
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
