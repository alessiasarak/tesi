import { Component } from '@angular/core';
import { TitleComponent } from '../../component/title/title.component';
import { Router } from '@angular/router';
import { SubtitleComponent } from '../../component/subtitle/subtitle.component';

@Component({
  selector: 'app-email-send',
  standalone: true,
  imports: [ TitleComponent, SubtitleComponent ],
  templateUrl: './email-send.component.html',
  styleUrl: './email-send.component.css'
})
export class EmailSendComponent {
  constructor(private router: Router){}

  login(){
    this.router.navigateByUrl("/login");
  }
}
