import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule, 
    MatIconModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnChanges{
  token: string | null = localStorage.getItem('token')

  ngOnChanges(changes: SimpleChanges): void {
    this.token = localStorage.getItem('token')
  }
}
