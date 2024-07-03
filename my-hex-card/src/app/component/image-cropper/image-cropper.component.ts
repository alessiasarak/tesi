import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, computed, effect, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ImageCropperDialogComponent } from '../image-cropper-dialog/image-cropper-dialog.component';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-image-cropper',
  standalone: true,
  imports: [ CommonModule, MatIconModule ],
  templateUrl: './image-cropper.component.html',
  styleUrl: './image-cropper.component.css'
})
export class ImageCropperComponent {
  imageWidth = signal(0);
  @Input() set width(val: number){
    this.imageWidth.set(val);
  }

  imageHeight = signal(0);
  @Input() set height(val: number){
    this.imageHeight.set(val);
  }

  placeholder = computed(() => `https://placehold.co/${this.imageWidth()}x${this.imageHeight()}`);

  croppedImage = signal<string | undefined>(undefined);

  imageSource = computed(() => {
    return this.croppedImage() ?? this.placeholder();
  });

  dialog = inject(MatDialog);

  fileSelected(event: any){
    const file = event.target.files[0];
    if(file){
      const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
        data: { image: file, width: this.imageWidth(), height: this.imageHeight() },
        width: '500px'
      });

      dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result:any) => {
        this.croppedImage.set(result.imageUrl);
      });
    }
  }

  @Output() imageReady = new EventEmitter<string>();

  constructor(){
    effect(() => {
      if(this.croppedImage()) {
        this.imageReady.emit(this.croppedImage());
      }
    });
  }
}
