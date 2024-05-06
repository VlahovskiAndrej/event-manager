import {Component} from '@angular/core';
import {MatDialog, MatDialogContent, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dialog-account-details',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './dialog-account-details.component.html',
  styleUrl: './dialog-account-details.component.css'
})
export class DialogAccountDetailsComponent {

}
