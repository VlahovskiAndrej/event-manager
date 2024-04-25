import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
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
        location.href = '/events';
      }
    )
  }


}
