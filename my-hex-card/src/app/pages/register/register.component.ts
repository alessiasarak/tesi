import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, MatIconModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //constructor
  constructor(private router: Router, private service: AuthService, private fb: FormBuilder, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.token = params['token']; 
    });
  }

  //properties
  myForm : FormGroup = this.fb.group({
    email: [''],
    password: [''],
    repeatPassword: ['']
  });

  showPassword = false;
  user: User = {
    id: 0,
    email: '',
    password: '',
    fk_role: { role: 'USER' }
  };

  token : string = "";
  isVisible = false;

  async onSubmit() {
    this.user.email = this.myForm.value.email;
    this.user.password = this.myForm.value.password;
    
    let response = await this.service.register(this.user, this.token);
    
    if(response) this.router.navigateByUrl("/login");
    else {
      this.isVisible = true;
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login(){
    this.router.navigateByUrl("/login/"+this.token);
  }
}
