import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as L from 'leaflet';
import { EventService } from '../../services/event.service';
import { EventInterface } from '../../interfaces/event';
import { EventComponent } from '../event/event.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-near-me-map',
  standalone: true,
  imports: [
    EventComponent,
    RouterLink
  ],
  templateUrl: './near-me-map.component.html',
  styleUrl: './near-me-map.component.css'
})
export class NearMeMapComponent implements OnInit {
  map: L.Map|any;
  marker: L.Marker|any;

  myLongitude: number|undefined
  myLatitude: number|undefined

  events: EventInterface[] = [] 


  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getLocation()
    this.eventService.getEvents().subscribe(
      (e) => {
        this.events = e
        this.mapCoordinates()
      }
    )
  }

  private initializeMap() {
    this.map = L.map('map').setView([this.myLatitude!!, this.myLongitude!!], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    var myIcon = L.icon({
      iconUrl: 'assets/map-icons/location-pin.png',
      iconSize: [40, 41],
      iconAnchor: [12, 41],
      popupAnchor: [8, -34],
      tooltipAnchor: [16, -28],
    });

    L.marker([this.myLatitude!!, this.myLongitude!!], {icon: myIcon} ).addTo(this.map)
    .bindPopup('You are here!')

    this.mapCoordinates();

    
  }


  private getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.myLatitude = position.coords.latitude;
          this.myLongitude = position.coords.longitude;
          this.initializeMap();
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }


  private mapCoordinates(){

    // var eventIcon = L.icon({
    //   iconUrl: 'assets/map-icons/billboard.png',
    //   iconSize: [30, 31],
    //   iconAnchor: [12, 41],
    //   popupAnchor: [8, -34],
    //   tooltipAnchor: [16, -28],
    // });

    for(const e of this.events){
      


      if (e.latitude != '' && e.longitude != ''){



        L.marker([Number.parseFloat(e.latitude), Number.parseFloat(e.longitude)] ).addTo(this.map)
        .bindPopup(`
        <div class="custom-popup">
        <h4>
          <h4 style="overflow: hidden;">${e.name}</h4>
        </h4>
        <h6>${e.category}</h6>
        <p>Distance: ${this.calculateDistance(e)} km</p>
        </div>
        `)
      }
      
    };
  }


  onClick(num: number){
    console.log(num)
  }
  
  calculateDistance(e: EventInterface) {

    const lat: number = Number.parseFloat(e.latitude)
    const lon: number = Number.parseFloat(e.longitude)
    const R = 6371; // Earth's radius in kilometers

    const dLat = this.deg2rad(this.myLatitude!! - lat);
    const dLon = this.deg2rad(this.myLongitude!! - lon);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(this.myLatitude!!)) * Math.cos(this.deg2rad(lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance.toFixed(2);
}

private deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}


}
