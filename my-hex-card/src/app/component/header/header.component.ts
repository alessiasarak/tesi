import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HamburgerMenuComponent } from '../hamburger-menu/hamburger-menu.component';
import { CommonModule } from '@angular/common';
import { Location } from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatIconModule, HamburgerMenuComponent, CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isVisible = false;
  menuList : any[] = [];

  userMenu = [
    { link: "/settings", title: "Home", active: true },
    { link: "/profile-settings", title: "Profilo", active: false },
    { link: "/logout", title: "Logout", active: false }
  ];
  adminMenu = [];
  notLoggedMenu = [
    { link: "/login", title: "Home", active: true },
    { link: "https://hexcard.ch/store/", title: "Compra la card", active: false },
    { link: "https://hexcard.ch/contatti/", title: "Aiuto?", active: false }
  ];

  menu(){
    this.isVisible = !this.isVisible;
  }
  setSelected(i : number){
    for(let item of this.menuList){
      item.active = false;
    }

    this.menuList[i].active = true;
  }
  
  ngOnInit() {
    let userLogged = localStorage.getItem("user_id");
    if(userLogged) {
      let role = localStorage.getItem("role");
      if(role && role == "USER") this.menuList = this.userMenu;
      else if(role && role == "ADMIN") this.menuList = this.adminMenu;
    }
  }

  
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
