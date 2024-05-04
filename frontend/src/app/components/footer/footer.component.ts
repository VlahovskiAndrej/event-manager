import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatDivider
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
