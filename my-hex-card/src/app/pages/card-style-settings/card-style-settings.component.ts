import { Component } from '@angular/core';
import { Card } from '../../interfaces/card';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Style } from '../../interfaces/style';
import { MainComponent } from '../main/main.component';
import { MyButtonComponent } from '../../component/my-button/my-button.component';

@Component({
  selector: 'app-card-style-settings',
  standalone: true,
  imports: [ CommonModule, MatIconModule, ReactiveFormsModule, MyButtonComponent ],
  templateUrl: './card-style-settings.component.html',
  styleUrl: './card-style-settings.component.css'
})
export class CardStyleSettingsComponent {

  //constructor
  constructor(private router: Router, private route: ActivatedRoute, private service: CardService, private fb: FormBuilder){}

  ngOnInit(): void {
    //get dal db i colori impostati
  }

  //properties
  myForm : FormGroup = this.fb.group({
    backgroundColor: [''],
    textColor: [''],
    buttonColor: ['']
  });

  style: Style = {
    id: 0,
    primary_color: '',
    secondary_color: '',
    tertiary_color: ''
  };

  assignValues(style: Style){
    this.myForm.setValue({
      backgrondColor: style.primary_color,
      textColor: style.secondary_color,
      buttonColor: style.tertiary_color,
    });
  }

  async onSubmit() {
    this.style.primary_color = this.myForm.value.backgroundColor;
    this.style.secondary_color = this.myForm.value.textColor;
    this.style.tertiary_color = this.myForm.value.buttonColor;

    console.log(this.style);
    this.router.navigateByUrl("/preview-card/"+3);
    
    //let response = await this.service.putCard(this.card);
    
    //if(response) this.router.navigateByUrl("/settings");
  }
}
