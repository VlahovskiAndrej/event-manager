import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButton
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(firstName: string, lastName: string, username: string, password: string) {
    this.authService.register(firstName, lastName, username, password).subscribe(
      (response) => {
        console.log(response)
        localStorage.setItem('token', response['token'])
        localStorage.setItem('username', response['username'])
        location.href = '/events'
      }
    )
  }
}
