import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-event-details-map',
  standalone: true,
  imports: [],
  templateUrl: './event-details-map.component.html',
  styleUrl: './event-details-map.component.css'
})
export class EventDetailsMapComponent implements OnInit {
  map: L.Map|any;
  marker: L.Marker|any;

 @Input() longitude: string|undefined
 @Input() latitude: string|undefined


  constructor() { }

  ngOnInit(): void {
    console.log(this.latitude, this.longitude)
    this.initializeMap();
  }

  private initializeMap() {
    this.map = L.map('map').setView([Number.parseFloat(this.latitude!!), Number.parseFloat(this.longitude!!)], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    L.marker([Number.parseFloat(this.latitude!!), Number.parseFloat(this.longitude!!)]).addTo(this.map)
    .bindPopup('Here!')
  }


  
}
