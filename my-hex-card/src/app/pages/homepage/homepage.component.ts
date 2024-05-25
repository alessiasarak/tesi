import { Component } from '@angular/core';
import { TitleComponent } from '../../component/title/title.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ TitleComponent, CommonModule ],
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
}
