import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HamburgerMenuComponent } from '../hamburger-menu/hamburger-menu.component';
import { CommonModule } from '@angular/common';
import { Location } from "@angular/common";
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

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
    let userLogged = sessionStorage.getItem("user_id");
    if(userLogged) {
      let role = sessionStorage.getItem("role");
      if(role && role == "USER") this.menuList = this.userMenu;
      else if(role && role == "ADMIN") this.menuList = this.adminMenu;
    } else this.menuList = this.notLoggedMenu;
  }
  constructor(private location: Location, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.ngOnInit();
    });
  }

  isCurrentPage(link: string): boolean {
    return this.router.url === link;
  }

  goBack(): void {
    this.location.back();
  }
}
