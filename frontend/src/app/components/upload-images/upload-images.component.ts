import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Route } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

interface Image {
  url: string | ArrayBuffer;
  file: File|undefined;
}

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [NgFor, MatButton, MatButtonModule, MatCardModule],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.css',
  providers: [provideNativeDateAdapter()],
})
export class ImageUploadComponent implements OnInit{

  @Input() edit: string|undefined
  thumbnail: Image|null = null
  images: Image[] = [];

  @Output() imagesEvent = new EventEmitter<{'images':Image[], 'thumbnail': Image|null}>();


  constructor(private eventService: EventService, private route: ActivatedRoute){}

  ngOnInit(): void {
    if (this.edit != undefined){
      
      const id = this.route.snapshot.params['id'];
      
      this.eventService.getThumbnail(id).subscribe(
        (t) => {
          const blob = new Blob([t], { type: 'image/jpeg' });
          this.thumbnail = {
            url: URL.createObjectURL(blob),
            file: undefined
          } 
          // this.imagesEvent.emit({'images': this.images, 'thumbnail': this.thumbnail})

        } 
        
      )

      for(let i=0; i<5; i++)
        this.eventService.getImages(id, i).subscribe({
          next: (response: any) => {
            const blob = new Blob([response], { type: 'image/jpeg' });
            this.images.push(
              {
                url: URL.createObjectURL(blob),
                file: undefined
              }
            )
            this.imagesEvent.emit({'images': this.images, 'thumbnail': this.thumbnail})
          }
        })


    }
    
    console.log({'images': this.images, 'thumbnail': this.thumbnail})

    // console.log("tnail:" + this.thumbnail?.url)
  }

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



