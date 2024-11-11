import { Component } from '@angular/core';
import { TitleComponent } from '../../component/title/title.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '../../component/subtitle/subtitle.component';
import { SecondaryButtonComponent } from '../../component/secondary-button/secondary-button.component';
import { PrimaryButtonComponent } from '../../component/primary-button/primary-button.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ TitleComponent, SubtitleComponent, CommonModule, PrimaryButtonComponent, SecondaryButtonComponent ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  token : string | undefined;

  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.route.params.subscribe(async params => {
      this.token = params['token']; 
    });
  }

  register(){
    this.router.navigateByUrl("/register/"+this.token);
  }
  
  login(){
    if(this.token) this.router.navigateByUrl("/login/"+this.token);
    else this.router.navigateByUrl("/login");
  }

  downloadGuide() {
    const pdfLink = 'assets/guide.pdf'; 
    const link = document.createElement('a');
    link.href = pdfLink;
    link.download = 'guide.pdf';
    link.click();
  }
}
