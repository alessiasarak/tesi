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
  showBackButton = false;
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
    { link: "/", title: "Home" },
    { link: "/login", title: "Login" }/*,
    { link: "https://hexcard.ch/store/", title: "Compra la card" },
    { link: "https://hexcard.ch/contatti/", title: "Aiuto?" }*/
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
      this.updateBackButtonVisibility();
    });
  }

  isCurrentPage(link: string): boolean {
    return this.router.url === link;
  }

  goBack(): void {
    const currentUrl = this.router.url;
    
    if (currentUrl === '/profile-settings') {
      this.router.navigate(['/settings']);
    } else if (/^\/card-settings\/[^\/]+$/.test(currentUrl)) {
      this.router.navigate(['/settings']);
    } else {
      this.location.back();
    }
  }
  

  updateBackButtonVisibility(): void {
    if(this.router.url == '/settings' || this.router.url == '/admin' 
    || this.router.url == '/' || this.router.url == '/login'  
    || this.router.url == '/register' || this.router.url == '/forgot-password'){
      this.showBackButton = false;
    }else this.showBackButton = true;
  }
}
