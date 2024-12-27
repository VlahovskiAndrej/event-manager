import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, MatButtonModule],

  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.css'
})
export class MainSectionComponent {

  constructor(private router: Router) { }

  redirectToCreateEvent(): void {
    this.router.navigate(['/events/create']);
  }

}
