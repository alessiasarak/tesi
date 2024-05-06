import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Card } from '../../interfaces/card';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  users : User[] = [];

  constructor (private router: Router, private authService: AuthService, private service: UserService, private cardService : CardService){}

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  addUser(){
    this.router.navigateByUrl("/add-user");
  }

  async seeUserCard(userId : number, userEmail : string){
    this.router.navigateByUrl("/user-cards/"+userId+"/"+userEmail);
  }
}
