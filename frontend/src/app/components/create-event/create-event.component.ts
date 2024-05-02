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
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { ImageUploadComponent } from '../upload-images/upload-images.component';
import { MapComponent } from '../map/map.component';


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
    MatSelectModule,
    MatRadioModule,
    ImageUploadComponent,
    MapComponent
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {

  favoriteSeason: string = 'virtual';
  isChecked: boolean = false
  longitude: number|undefined 
  lattitude: number|undefined 

  categories = [
    {value: 'TECH', viewValue: 'Tech'},
    {value: 'BUSINESS', viewValue: 'Business'},
    {value: 'COMMUNITY', viewValue: 'Community'},
    {value: 'EDUCATION', viewValue: 'Education'},
    {value: 'CORPORATE', viewValue: 'Corporate'},
    {value: 'WORKSHOP', viewValue: 'Workshop'},
    {value: 'SOCIAL', viewValue: 'Social'},
    {value: 'CULTURAL', viewValue: 'Cultural'}
  ];


  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    meetingUrl: ['', Validators.nullValidator],
    type: ['', Validators.required],
    longitude: ['', Validators.nullValidator],
    lattitude: ['', Validators.nullValidator],
    dateStart: ['', Validators.required],
    dateFinish: ['', Validators.required]
  });

  thirdFormGroup = this._formBuilder.group({
    price: ['', Validators.nullValidator],
    numberOfTickets: ['', Validators.nullValidator],
  });

  isEditable = true;

  constructor(private eventService: EventService, private snackBar: MatSnackBar, private router: Router, private _formBuilder: FormBuilder){}

  tags: string[] = [];

  addTag(tagList: string[]){
    this.tags = tagList;
  }


  showSuccessMessage(){
    this.snackBar.open("Successfuly created event", "x");
  }

  createEvent() {
    this.eventService.createEvent(
      this.firstFormGroup.value.name!!, 
      this.firstFormGroup.value.description!!, 
      this.secondFormGroup.value.longitude ? this.secondFormGroup.value.longitude : "online-event", 
      this.secondFormGroup.value.lattitude ? this.secondFormGroup.value.lattitude : "online-event", 
      this.firstFormGroup.value.category!!, 
      this.tags, 
      this.secondFormGroup.value.dateStart!!, 
      this.secondFormGroup.value.dateFinish!!, 
    )
    .subscribe(
      (response) => {
        console.log(response)
        this.router.navigate(['events'])
        this.showSuccessMessage()
      }
    )
  }

  onChangeType(value: string){
    this.favoriteSeason = value
    console.log(this.favoriteSeason)
  }

  addCoordinates(value: {'lng': string, 'lat': string}){
    this.longitude = Number.parseFloat(value.lng)
    this.lattitude = Number.parseFloat(value.lat)
  }

}
