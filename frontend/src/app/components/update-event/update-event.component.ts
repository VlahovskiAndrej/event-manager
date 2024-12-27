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
import { ActivatedRoute } from '@angular/router';
import { EventInterface } from '../../interfaces/event';


@Component({
  selector: 'app-update-event',
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
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.css'
})
export class UpdateEventComponent implements OnInit{
 
  type: string = 'virtual';
  isChecked: boolean = false
  isFreeEnterance: boolean = false
  isUnlimitedTickets: boolean = false
  longitude: number|undefined
  lattitude: number|undefined
  images: File[] = []
  thumbnail: Image|null = null
  event: EventInterface|null = null

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
    name: [this.event?.name.toString(), Validators.nullValidator],
    description: [this.event?.description.toString()],
    category: [this.event?.category.toString()],
  });

  secondFormGroup = this._formBuilder.group({
    meetingUrl: [ this.event?.meetingUrl.toString()],
    type: [this.event?.type.toString()],
    longitude: [this.event?.longitude.toString()],
    lattitude: [this.event?.latitude.toString()],
    dateStart: [this.event?.dateStart.toString()],
    dateFinish: [this.event?.dateFinish.toString()],
    timeStart: [this.event?.timeStart.toString()],
    timeFinish: [this.event?.timeFinish.toString()]
  });

  thirdFormGroup = this._formBuilder.group({
     price: [this.event?.price.toString(), Validators.nullValidator],
     numberOfTickets: [this.event?.availableTickets.toString(), Validators.nullValidator],
  });

  isEditable = true;

  constructor(private route: ActivatedRoute, private eventService: EventService, private snackBar: MatSnackBar, private router: Router, private _formBuilder: FormBuilder){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.eventService.getEventById(id).subscribe(
      (e) => {
        this.event = e
        e.tags.forEach(tag => {
          this.tags.push(tag.name)
        });

        this.longitude = Number.parseFloat(e.longitude)
        this.lattitude = Number.parseFloat(e.latitude)
        this.firstFormGroup.get('name')?.setValue(e.name)
        this.firstFormGroup.get('description')?.setValue(e.description)
        
        this.secondFormGroup.get('meetingUrl')?.setValue(e.meetingUrl)
        this.secondFormGroup.get('type')?.setValue(e.type)
        this.secondFormGroup.get('dateStart')?.setValue(e.dateStart.toString())
        this.secondFormGroup.get('dateFinish')?.setValue(e.dateFinish.toString())
        this.secondFormGroup.get('timeStart')?.setValue(e.timeStart.toString())
        this.secondFormGroup.get('timeFinish')?.setValue(e.timeFinish.toString())

      }
    )


    // this.eventService.getThumbnail(id).subscribe(
    //   (t) => {
    //     const blob = new Blob([t], { type: 'image/jpeg' });
    //     this.thumbnail = {
    //       url: URL.createObjectURL(blob),
    //       file: undefined
    //     } 
    //   } 
      
    // )

    // for(let i=0; i<5; i++)
    //   this.eventService.getImages(id, i).subscribe({
    //     next: (response: any) => {
    //       const blob = new Blob([response], { type: 'image/jpeg' });
    //       this.images.push(
    //         {
    //           url: URL.createObjectURL(blob),
    //           file: undefined
    //         }
    //       )
    //       this.imagesEvent.emit({'images': this.images, 'thumbnail': this.thumbnail})
    //     }
    //   })




    this.type = 'virtual'
}


  tags: string[] = [];

  addTag(tagList: string[]){
    this.tags = tagList;
  }

  showSuccessMessage(){
    this.snackBar.open("Successfuly updated event", '', {
      duration: 2000, 
      panelClass: 'green-snackbar'
    },);
  }

  showFailureMessage(){
    this.snackBar.open("Successfuly removed event", '', {
      duration: 2000, 
      panelClass: 'red-snackbar'
    },);
  }

  createEvent() {

    const formData = new FormData();
    // formData.append('file', this.thumbnail?.file!!)
    formData.append('name', this.firstFormGroup.value.name!!)
    formData.append('description', this.firstFormGroup.value.description!!);
    formData.append('longitude',  this.longitude ? this.longitude.toString() : '');
    formData.append('latitude',  this.lattitude ? this.lattitude.toString() : '');
    formData.append('category', this.firstFormGroup.value.category!!);
    formData.append('tagsNames', this.tags.join(","));

    const dateStartModified = new Date(this.secondFormGroup.value.dateStart!!);
    const dateFinishModified = new Date(this.secondFormGroup.value.dateFinish!!);

    const regex = / (\d{1,2}:\d{2}:\d{2})/;
    formData.append('dateStart', dateStartModified.toString().split(regex)[0]);
    formData.append('dateFinish', dateFinishModified.toString().split(regex)[0]);

    formData.append('timeFinish', this.secondFormGroup.value.timeFinish!!);
    formData.append('timeStart', this.secondFormGroup.value.timeStart!!);
    formData.append('meetingUrl', this.secondFormGroup.value.meetingUrl!!);
    formData.append('type', this.secondFormGroup.value.type!!);
    // for (let img of this.images) {
    //   formData.append('files', img);
    // }



    this.eventService.updateEvent(formData, this.event?.id!!).subscribe(
      res => {
        this.router.navigate(['events'])
        this.showSuccessMessage()
      }
    )
  }

  onChangeType(value: string){
    this.type = value
    console.log(this.type)
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
    console.log(this.images)
    console.log(this.thumbnail)
  }

  onDeleteEvent(id: number){
    this.eventService.deleteEvent(id).subscribe(
      () => location.href = 'events/my-events'
    )
  }
}
