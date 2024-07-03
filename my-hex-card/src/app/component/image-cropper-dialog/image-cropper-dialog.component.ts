import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';
import { SecondaryButtonComponent } from '../secondary-button/secondary-button.component';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';

export type CropperDialogData = {
  image: File,
  width: number,
  height: number
}

export type CropperDialogResult = {
  blob: Blob;
  imageUrl: string;
}

@Component({
  selector: 'app-image-cropper-dialog',
  standalone: true,
  imports: [ CommonModule, MatDialogModule, ImageCropperComponent, SecondaryButtonComponent, PrimaryButtonComponent ],
  templateUrl: './image-cropper-dialog.component.html',
  styleUrl: './image-cropper-dialog.component.css'
})
export class ImageCropperDialogComponent {
  data: CropperDialogData = inject(MAT_DIALOG_DATA);

  result = signal<CropperDialogResult | undefined>(undefined);
  
  imageCropped(event: ImageCroppedEvent){
    const { blob, objectUrl } = event;
    if(blob && objectUrl){
      this.result.set({blob, imageUrl: objectUrl });
    }
  }
}
