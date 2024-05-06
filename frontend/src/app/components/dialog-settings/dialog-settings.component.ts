import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-settings',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-settings.component.html',
  styleUrl: './dialog-settings.component.css'
})
export class DialogSettingsComponent {

}
