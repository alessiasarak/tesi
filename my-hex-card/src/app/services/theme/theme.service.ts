import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme: boolean = false;

  constructor() { }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  setDarkTheme() {
    document.body.style.background = "00ff00";
    document.body.style.setProperty("background-color", "#000000");

  }

  setLightTheme() {
    document.body.style.background = "00ff00";
    document.body.style.setProperty("background-color", "#ffffff");
  }
}

