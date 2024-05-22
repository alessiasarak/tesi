import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HamburgerMenuComponent } from '../hamburger-menu/hamburger-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatIconModule, HamburgerMenuComponent, CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isVisible = false;

  menu(){
    this.isVisible = !this.isVisible;
  }
}
