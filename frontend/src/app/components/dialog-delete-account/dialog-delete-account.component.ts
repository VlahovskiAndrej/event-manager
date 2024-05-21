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
  selector: 'app-dialog-delete-account',
  standalone: true,
  imports: [MatDialogModule, MatDialogActions, MatDialogContent, MatButtonModule,
    MatSlideToggleModule,
    FormsModule],
  templateUrl: './dialog-delete-account.component.html',
  styleUrl: './dialog-delete-account.component.css'
})
export class DialogDeleteAccountComponent {
  constructor(private authService: AuthService) {}

  deleteAccount(){
    this.authService.deleteUser().subscribe(
      () =>{
        this.authService.logout()
      } 
    )
  }
}
