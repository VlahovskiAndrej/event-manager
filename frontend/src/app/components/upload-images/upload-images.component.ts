import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

interface Image {
  url: string | ArrayBuffer;
  file: File;
}

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [NgFor, MatButton, MatButtonModule, MatCardModule],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.css'
})
export class ImageUploadComponent {

  thumbnail: Image|null = null
  images: Image[] = [];

  @Output() imagesEvent = new EventEmitter<{'images':Image[], 'thumbnail': Image|null}>();

  onFilesSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push({ url: e.target.result, file });
        };
        reader.readAsDataURL(file);
      }
    }
    this.imagesEvent.emit({'images': this.images, 'thumbnail': this.thumbnail})
  }

  onThumbnailSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
        const file: File = files[0];
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
          this.thumbnail = { url: e.target.result, file };
          this.imagesEvent.emit({'images': this.images, 'thumbnail': this.thumbnail})
        };
        reader.readAsDataURL(file);
    }

  }

  removeImage(image: Image): void {
    this.images.splice(this.images.indexOf(image), 1);
    this.imagesEvent.emit({'images': this.images, 'thumbnail': this.thumbnail})
  }

  removeThumbnail(): void{
    this.thumbnail = null
    this.imagesEvent.emit({'images': this.images, 'thumbnail': this.thumbnail})
  }
}



