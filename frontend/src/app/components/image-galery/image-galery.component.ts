import { Component, Input, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-galery',
  standalone: true,
  imports: [
    MatIconModule
   ],
  templateUrl: './image-galery.component.html',
  styleUrl: './image-galery.component.css'
})
export class ImageGalleryComponent implements OnInit{
  @Input() slides: string[] = [];
  i: number = 0;

  ngOnInit(): void {
    this.i = this.slides.length
  }

  getSlide() {
    return this.slides[this.i];
  }

  getPrev() {
    this.i == 0 ? (this.i = this.slides.length - 1) : this.i--;
  }

  getNext() {
    this.i < this.slides.length - 1 ? this.i++ : (this.i = 0);
  }
}
