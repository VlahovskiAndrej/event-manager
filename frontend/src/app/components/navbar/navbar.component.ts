import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAccountDetailsComponent } from '../dialog-account-details/dialog-account-details.component';
import { DialogSettingsComponent } from '../dialog-settings/dialog-settings.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule, 
    MatIconModule,
    MatMenuModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatDialogModule,
    DialogAccountDetailsComponent,
    DialogSettingsComponent
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  token: string | null = localStorage.getItem('token')
  username: string | null = localStorage.getItem('username')

  constructor(
    private authService: AuthService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe(
      (u) => this.username = u.firstName
    )
  }

  logout() {
    this.authService.logout()
  } 

  openAccountDetailsDialog() {
    const dialogRef = this.dialog.open(DialogAccountDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSettingsDialog() {
    const dialogRef = this.dialog.open(DialogSettingsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
