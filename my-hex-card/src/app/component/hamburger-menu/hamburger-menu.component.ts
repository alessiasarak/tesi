import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [ MatIconModule ],
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.css'
})
export class HamburgerMenuComponent {

  menu(){
    var x = document.getElementById("myLinks");
    
    if (x!.style.display === "block") {
      x!.style.display = "none";
    } else {
      x!.style.display = "block";
    }
  }
}
