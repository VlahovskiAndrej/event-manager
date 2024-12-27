import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dialog-settings',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './dialog-settings.component.html',
  styleUrl: './dialog-settings.component.css'
})
export class DialogSettingsComponent {

}
