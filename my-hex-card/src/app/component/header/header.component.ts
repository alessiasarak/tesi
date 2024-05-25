import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HamburgerMenuComponent } from '../hamburger-menu/hamburger-menu.component';
import { CommonModule } from '@angular/common';
import { Location } from "@angular/common";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatIconModule, HamburgerMenuComponent, CommonModule, RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isVisible = false;
  menuList : any[] = [];

  userMenu = [
    { link: "/settings", title: "Home" },
    { link: "/profile-settings", title: "Profilo" },
    { link: "/logout", title: "Logout" }
  ];
  adminMenu = [
    { link: "/admin", title: "Home" },
    { link: "/profile-settings", title: "Profilo" },
    { link: "/logout", title: "Logout" }
  ];
  notLoggedMenu = [
    { link: "/login", title: "Home" },
    { link: "https://hexcard.ch/store/", title: "Compra la card" },
    { link: "https://hexcard.ch/contatti/", title: "Aiuto?" }
  ];

  menu(){
    this.isVisible = !this.isVisible;
  }
  
  ngOnInit() {
    let userLogged = localStorage.getItem("user_id");
    if(userLogged) {
      let role = localStorage.getItem("role");
      if(role && role == "USER") this.menuList = this.userMenu;
      else if(role && role == "ADMIN") this.menuList = this.adminMenu;
    } else this.menuList = this.notLoggedMenu;
  }
  
  constructor(private location: Location, private router: Router) {}

  isCurrentPage(link: string): boolean {
    return this.router.url === link;
  }

  goBack(): void {
    this.location.back();
  }
}
