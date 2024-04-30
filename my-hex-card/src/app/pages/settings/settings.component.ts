import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  //constructor
  constructor(private service: AuthService, private router: Router){}

  ngOnInit(): void {
    if(localStorage.getItem("role") == "ADMIN") this.router.navigateByUrl("/admin");
  }
  
  logout(){
    this.service.logout();
    this.router.navigateByUrl("/login");
  }
}
