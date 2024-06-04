import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { Card } from '../../interfaces/card';
import { TitleComponent } from '../../component/title/title.component';
import { CardPreviewComponent } from '../../component/card-preview/card-preview.component';
import { LoadingComponent } from '../../component/loading/loading.component';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '../../component/subtitle/subtitle.component';

@Component({
  selector: 'app-card-preview-page',
  standalone: true,
  imports: [ TitleComponent, SubtitleComponent, CardPreviewComponent, LoadingComponent, CommonModule ],
  templateUrl: './card-preview-page.component.html',
  styleUrl: './card-preview-page.component.css'
})
export class CardPreviewPageComponent {
  card : Card = {
    id: 0,
    img: '',
    name: '',
    surname: '',
    company: '',
    function: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    whatsapp: '',
    youtube: '',
    token: '',
    active: false,
    fk_id_user: 0,
    fk_id_contact: 0,
    email: [],
    phone_number: [],
    link: [],
    address: [],
    background_color: '',
    text_color: '',
    button_color: ''
  };
  isLoading = true;

  constructor(private router: Router, private route: ActivatedRoute, private service: CardService){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.service.getCard(params['id']!).subscribe((data) => {
        this.card = data;
        this.isLoading = false;
      });
    });
  }
}
