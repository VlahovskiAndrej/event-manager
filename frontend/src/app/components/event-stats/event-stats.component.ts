import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { Chart } from 'chart.js';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-event-stats',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './event-stats.component.html',
  styleUrl: './event-stats.component.css'
})
export class EventStatsComponent implements OnInit{

  ngOnInit(): void {
    const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
    const yValues = [55, 49, 44, 24, 15];
    const barColors = ["red", "green","blue","orange","brown"];

    new Chart("myChart", {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      }
    });
  }
  
}

