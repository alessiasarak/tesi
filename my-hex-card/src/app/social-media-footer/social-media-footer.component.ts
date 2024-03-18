import { Component } from '@angular/core';

@Component({
  selector: 'app-social-media-footer',
  standalone: true,
  imports: [],
  templateUrl: './social-media-footer.component.html',
  styleUrl: './social-media-footer.component.css'
})
export class SocialMediaFooterComponent {
  whatsapp: string = "www.whatsapp.com";
  facebook: string = "www.facebook.com";
  instagram: string = "www.instagram.com";
  youtube: string = "www.youtube.com";
  linkedin: string = "www.linkedin.com";
  
}
