import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    // private routerLink:
  ) {}


  ngOnInit() {
    // this.createForm();
    // this.errorHandleService.errorMessage$.subscribe((message) => {
    //   this.errorMessage = message;
    // });
  }


  onSubmit(username: string, password: string) {
    // const username = formData.value.username;
    // const password = formData.value.password;
    this.authService.login(username, password).subscribe(
      (response) => {
        console.log(response)
        localStorage.setItem('token', response['token'])
        localStorage.setItem('username', response['username'])
        location.href = '/events';
      }
    )
  }


}
