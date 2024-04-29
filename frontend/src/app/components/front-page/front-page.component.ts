import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [MatIconModule,MatDividerModule,MatButtonModule],
  
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.css'
})
export class FrontPageComponent {

}
