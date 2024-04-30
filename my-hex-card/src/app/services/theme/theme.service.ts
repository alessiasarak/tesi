import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme: boolean = false;

  constructor() { }

  setBackgroundColor(color : string){
    document.body.style.setProperty("background-color", color);
  }

  setTextColor(color : string){
    document.body.style.setProperty("color", color);
  }

  setButtonColor(color : string){
    //document.but("color", color);
  }
}

