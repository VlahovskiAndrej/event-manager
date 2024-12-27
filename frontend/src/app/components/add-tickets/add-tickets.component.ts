import { Component, Input, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Observable, Subject } from 'rxjs';
import {MatChipsModule} from '@angular/material/chips';
import { AddTagsComponent } from '../add-tags/add-tags.component';
import { EventService } from '../../services/event.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { routes } from '../../app.routes';
import { ActivatedRoute, Router } from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper';
import { GoogleMapsModule } from '@angular/google-maps'
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { ImageUploadComponent } from '../upload-images/upload-images.component';
import { MapComponent } from '../create-event-map/map.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import { Image } from '../../interfaces/image';
import { EventInterface } from '../../interfaces/event';

@Component({
  selector: 'app-add-tickets',
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
  templateUrl: './add-tickets.component.html',
  styleUrl: './add-tickets.component.css'
})
export class AddTicketsComponent implements OnInit{

  event: EventInterface|null = null

  isFreeEnterance: boolean = false
  isDontIssueMore: boolean = false

  constructor(private _formBuilder: FormBuilder, private eventService: EventService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar){}


  ngOnInit(): void {
    this.eventService.getEventById(this.route.snapshot.params['id']).subscribe(
      e => this.event = e 
    )
  }

  ticketsFormGroup = this._formBuilder.group({
    price: ['', Validators.nullValidator],
    numberOfTickets: ['', Validators.nullValidator],
 });

 onChangeFreeEnterance(){
  if (!this.isFreeEnterance){
    this.ticketsFormGroup.get('price')?.disable()
    this.ticketsFormGroup.get('price')?.setValue('0.00')
    this.isFreeEnterance = true
  }
  else{
    this.ticketsFormGroup.get('price')?.enable()
    this.isFreeEnterance = false
  } 
    
}

onSetSamePrice(){
  this.ticketsFormGroup.get('price')?.setValue(this.event?.price.toString()!!)
}


onChangeDontIssueMore(){
  if(!this.isDontIssueMore){
    this.ticketsFormGroup.get('numberOfTickets')?.disable()
    this.isDontIssueMore = true
  }
  else{
    this.ticketsFormGroup.get('numberOfTickets')?.enable()
    this.isDontIssueMore = false
  }

}


  issueTickets(){
    this.eventService.publishTickets(this.event?.id!!, this.ticketsFormGroup.get('price')?.value!!, this.ticketsFormGroup.get('numberOfTickets')?.value!!).subscribe(
      () => {
        this.ngOnInit()
        this.showSuccessMessage()
      }
    )
  }

  showSuccessMessage(){
    this.snackBar.open("Successfuly issued tickets", '', {
      duration: 3000, 
      panelClass: 'green-snackbar'
    },);
  }


}
