import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogContent, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialog-account-details',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
  templateUrl: './dialog-account-details.component.html',
  styleUrl: './dialog-account-details.component.css'
})
export class DialogAccountDetailsComponent implements OnInit{

  user: User|null = null
  panelOpenState = false;
  hide1 = true;
  hide2 = true;
  hide3 = true;
  firstNameDissabled = true
  lastNameDissabled = true


  constructor(private authService: AuthService,  private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe(
      u =>{
        console.log(u)
        this.user = u
      } 
        
    )
  }
  
 openSnackBar() {
    this._snackBar.open("Successfuly updated user!", '', {duration: 1000, panelClass: ['green-snackbar']})
  }


  onClickFirstName(){
    this.firstNameDissabled = !this.firstNameDissabled
  }

  onClickLastName(){
    this.lastNameDissabled = !this.lastNameDissabled
  }

  onSubmit(firstName: string, lastName: string, currentPassword: string, newPassword: string, repeatNewPassword: string, email: string){

    // const formData: FormData = new FormData()
    // formData.append("firstName", firstName)
    // formData.append("lastName", lastName)
    // formData.append("currentPassword", currentPassword)
    // formData.append("newPassword", newPassword)

    const formData = {
      firstName: firstName,
      lastName: lastName,
      currentPassword: currentPassword,
      newPassword: newPassword,
      email: email
    }

    const id = this.user?.id
    if (newPassword=='' || newPassword == repeatNewPassword){
      this.authService.updateUser(formData).subscribe(
        u =>{
          this.user = u
          this.openSnackBar()
        } 
          
      )
    }
  }
}
