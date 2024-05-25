import { Component } from '@angular/core';
import { TitleComponent } from '../../component/title/title.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-send',
  standalone: true,
  imports: [ TitleComponent ],
  templateUrl: './email-send.component.html',
  styleUrl: './email-send.component.css'
})
export class EmailSendComponent {
  constructor(private router: Router){}

  login(){
    this.router.navigateByUrl("/login");
  }
}
