import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';

interface Image {
  url: string | ArrayBuffer;
  file: File;
}

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [NgFor, MatButton, MatButtonModule],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.css'
})
export class ImageUploadComponent {
  images: Image[] = [];

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
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }
}



