import { Component } from '@angular/core';

@Component({
  selector: 'app-social-media-footer',
  standalone: true,
  imports: [],
  templateUrl: './social-media-footer.component.html',
  styleUrl: './social-media-footer.component.css'
})
export class SocialMediaFooterComponent {
  whatsapp: string = "https://www.whatsapp.com";
  facebook: string = "https://www.facebook.com";
  instagram: string = "https://www.instagram.com";
  youtube: string = "https://www.youtube.com";
  linkedin: string = "https://www.linkedin.com";

}
