import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Observable, Subject } from 'rxjs';
import {MatChipsModule} from '@angular/material/chips';
import { AddTagsComponent } from '../add-tags/add-tags.component';
import { EventService } from '../../services/event.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButton,
    MatChipsModule,
    AddTagsComponent
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {

  constructor(private eventService: EventService, private snackBar: MatSnackBar, private router: Router){}

  tags: string[] = [];

  addTag(tagList: string[]){
    this.tags = tagList;
  }


  showSuccessMessage(){
    this.snackBar.open("Successfuly created event", "x");
  }

  createEvent(name: string, 
              description: string, 
              longitude: string, 
              latitude: string, 
              category: string,  
              dateStart: string,
              dateFinish: string) {
    this.eventService.createEvent(name, description, longitude, latitude, category, this.tags, dateStart, dateFinish).subscribe(
      (response) => {
        console.log(response)
        this.router.navigate(['events'])
        this.showSuccessMessage()
      }
    )
  }
}
