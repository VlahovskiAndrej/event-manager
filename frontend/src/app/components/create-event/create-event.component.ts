import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Observable, Subject } from 'rxjs';
import {MatChipsModule} from '@angular/material/chips';
import { AddTagsComponent } from '../add-tags/add-tags.component';
import { EventService } from '../../services/event.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper';
import { GoogleMapsModule } from '@angular/google-maps'


@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButton,
    MatChipsModule,
    AddTagsComponent,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    GoogleMapsModule,
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {


  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    tags: ['', Validators.required],
    type: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  isEditable = true;

  create(){
    console.log(this.firstFormGroup.value)
    console.log(this.secondFormGroup.value)
  }

  constructor(private _formBuilder: FormBuilder) {}

  // constructor(private eventService: EventService, private snackBar: MatSnackBar, private router: Router){}

  // tags: string[] = [];
  // isEditable = true;

  // addTag(tagList: string[]){
  //   this.tags = tagList;
  // }


  // showSuccessMessage(){
  //   this.snackBar.open("Successfuly created event", "x");
  // }

  // createEvent(name: string, 
  //             description: string, 
  //             longitude: string, 
  //             latitude: string, 
  //             category: string,  
  //             dateStart: string,
  //             dateFinish: string) {
  //   this.eventService.createEvent(name, description, longitude, latitude, category, this.tags, dateStart, dateFinish).subscribe(
  //     (response) => {
  //       console.log(response)
  //       this.router.navigate(['events'])
  //       this.showSuccessMessage()
  //     }
  //   )
  // }
}
