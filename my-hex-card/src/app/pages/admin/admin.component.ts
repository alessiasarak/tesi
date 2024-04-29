import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  users : User[] = [];

  constructor (private authService: AuthService, private service: UserService){}

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  logout(){
    this.authService.logout();
  }
}
