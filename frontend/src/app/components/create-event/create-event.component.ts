import { Component, OnInit } from '@angular/core';
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
import { MapComponent } from '../create-event-map/map.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Image } from '../../interfaces/image';

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
    MapComponent,
    MatDatepickerModule,
    MatCheckboxModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent{

  favoriteSeason: string = 'virtual';
  isChecked: boolean = false
  isFreeEnterance: boolean = false
  isUnlimitedTickets: boolean = false
  longitude: number|undefined
  lattitude: number|undefined
  // images: Image[] = []
  images: File[] = []
  thumbnail: Image|null = null

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
    longitude: [''],
    lattitude: [''],
    dateStart: ['', Validators.required],
    dateFinish: ['', Validators.required],
    timeStart: ['', Validators.required],
    timeFinish: ['', Validators.required]
  });

  thirdFormGroup = this._formBuilder.group({
     price: ['0', Validators.nullValidator],
     numberOfTickets: ['0', Validators.nullValidator],
  });

  isEditable = true;

  constructor(private eventService: EventService, private snackBar: MatSnackBar, private router: Router, private _formBuilder: FormBuilder){}


  tags: string[] = [];

  addTag(tagList: string[]){
    this.tags = tagList;
  }

  showSuccessMessage(){
    this.snackBar.open("Successfuly created event", '', {duration: 3000});
  }

  createEvent() {

    // const formData = new FormData();
    // formData.append('name', this.firstFormGroup.value.name!!);
    // formData.append('description', this.firstFormGroup.value.description!!);
    // formData.append('longitude',  this.longitude ? this.longitude.toString() : '');
    // formData.append('lattitude',  this.lattitude ? this.lattitude.toString() : '');
    // formData.append('category', this.firstFormGroup.value.category!!);
    // formData.append('tagsNames', this.tags.join(","));
    // formData.append('dateStart', this.secondFormGroup.value.dateStart!!);
    // formData.append('dateFinish', this.secondFormGroup.value.dateFinish!!);
    // formData.append('timeFinish', this.secondFormGroup.value.timeFinish!!);
    // formData.append('timeStart', this.secondFormGroup.value.timeStart!!);
    // formData.append('meetingUrl', this.secondFormGroup.value.meetingUrl!!);
    // formData.append('type', this.secondFormGroup.value.type!!);
    // formData.append('price', this.thirdFormGroup.value.price!!);
    // formData.append('maxPeople', this.thirdFormGroup.value.numberOfTickets!!);
    // formData.append('type', this.secondFormGroup.value.type!!);

    // formData.append('images', this.images.join(','));
    // formData.append('thumbnail', this.thumbnail?.file!!);


      // this.eventService.createEvent(
      //   formData
      //   // this.firstFormGroup.value.name!!,
      //   // this.firstFormGroup.value.description!!,
      //   // this.longitude ? this.longitude.toString() : '',
      //   // this.lattitude ? this.lattitude.toString() : '',
      //   // this.firstFormGroup.value.category!!,
      //   // this.tags.join(","),
      //   // this.secondFormGroup.value.dateStart!!,
      //   // this.secondFormGroup.value.dateFinish!!,
      //   // this.secondFormGroup.value.timeStart!!,
      //   // this.secondFormGroup.value.timeFinish!!,
      //   // this.secondFormGroup.value.meetingUrl!!,
      //   // this.secondFormGroup.value.type!!,
      //   // Number.parseFloat(this.thirdFormGroup.value.price!!),
      //   // Number.parseFloat(this.thirdFormGroup.value.numberOfTickets!!),
      //   // this.images,
      //   // this.thumbnail?.file!!
      // )
      // .subscribe(
      //   (response) => {
      //     console.log(response)
      //     this.router.navigate(['events'])
      //     this.showSuccessMessage()
      //   }
      // )


      const formData = new FormData();
      formData.append('file', this.thumbnail?.file!!)
      formData.append('name', this.firstFormGroup.value.name!!)
      formData.append('description', this.firstFormGroup.value.description!!);
      formData.append('longitude',  this.longitude ? this.longitude.toString() : '');
      formData.append('latitude',  this.lattitude ? this.lattitude.toString() : '');
      formData.append('category', this.firstFormGroup.value.category!!);
      formData.append('tagsNames', this.tags.join(","));

      const dateStartModified = new Date(this.secondFormGroup.value.dateStart!!);
      const dateFinishModified = new Date(this.secondFormGroup.value.dateFinish!!);

      formData.append('dateStart', dateStartModified.toString().split(' 00:00')[0]);
      formData.append('dateFinish', dateFinishModified.toString().split(' 00:00')[0]);

      formData.append('timeFinish', this.secondFormGroup.value.timeFinish!!);
      formData.append('timeStart', this.secondFormGroup.value.timeStart!!);
      formData.append('meetingUrl', this.secondFormGroup.value.meetingUrl!!);
      formData.append('price', this.thirdFormGroup.value.price!!);
      formData.append('maxPeople', this.thirdFormGroup.value.numberOfTickets!!);
      formData.append('type', this.secondFormGroup.value.type!!);
      for (let img of this.images) {
        formData.append('files', img);
      }



      this.eventService.createEvent(formData).subscribe(
        res => {
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

  addImages(value: {'images':Image[], 'thumbnail': Image|null}){
    for(let image of value.images){
      this.images.push(image.file!!)
      console.log("added Image: " + image.file!!.name)
    }
    this.thumbnail = value.thumbnail

    console.log("Images: " + value.images.toString())
    console.log("Thumbnail: " + value.thumbnail?.toString())
  }

  onChangeFreeEnterance(){
    if (!this.isFreeEnterance){
      this.thirdFormGroup.get('price')?.disable()
      this.thirdFormGroup.get('price')?.setValue('0.00')
      this.isFreeEnterance = true
      console.log(this.secondFormGroup.value.timeStart)
      console.log(this.secondFormGroup.value.dateStart)
    }
    else{
      this.thirdFormGroup.get('price')?.enable()
      this.isFreeEnterance = false
    }

  }

  onChangeUnlimitedTickets(){
    if (!this.isUnlimitedTickets){
      this.thirdFormGroup.get('numberOfTickets')?.disable()
      this.isUnlimitedTickets = true
    }
    else {
      this.thirdFormGroup.get('numberOfTickets')?.enable()
      this.isUnlimitedTickets = false
    }

  }

}
