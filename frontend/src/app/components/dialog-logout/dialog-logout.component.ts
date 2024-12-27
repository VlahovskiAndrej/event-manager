import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-dialog-logout',
  standalone: true,
  imports: [MatDialogModule, MatDialogActions, MatDialogContent, MatButtonModule,
    MatSlideToggleModule,
    FormsModule],
  templateUrl: './dialog-logout.component.html',
  styleUrl: './dialog-logout.component.css'
})
export class DialogLogoutComponent {

  constructor(private authService: AuthService) {}

  logout(){
    this.authService.logout()
  }
}
