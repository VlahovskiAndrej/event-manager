import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { AddTagsComponent } from '../add-tags/add-tags.component';
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
    AddTagsComponent
  ],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.css'
})
export class UpdateEventComponent implements OnInit{
  event: EventInterface | undefined
  tags: string[] = [];

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
   ){}

   ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.eventService.getEventById(id).subscribe(
      (e) => {
        this.event = e
        e.tags.forEach(t => {
          this.tags.push(t.name)
        });
      }
    )
   }

    addTag(tagList: string[]){
      this.tags = tagList;
    }

   updateEvent(name: string, 
              description: string, 
              longitude: string, 
              latitude: string, 
              category: string,  
              dateStart: string,
              dateFinish: string) {
    this.eventService.updateEvent(this.route.snapshot.params['id'] , name, description, longitude, latitude, category, this.tags, dateStart, dateFinish, '', '', 1.0).subscribe(
        (response) => {
          console.log(response)
          this.router.navigate(['events/my-events'])
        }
        )
    }

}
