import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { EventService } from '../../services/event.service';
import { EventInterface } from '../../interfaces/event';
import { EventComponent } from '../event/event.component';
import { RouterLink } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { NearMeEventComponent } from '../near-me-event/near-me-event.component';
import { CustomDatePipe } from '../../pipes/custom.datepipe';
import { CustomDatePipeDetails } from '../../pipes/custom.datepipedetails';

@Component({
  selector: 'app-near-me-map',
  standalone: true,
  imports: [
    EventComponent,
    RouterLink,
    MatFormField,
    MatIcon,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NearMeEventComponent,
    CustomDatePipe,
    CustomDatePipeDetails
  ],
  templateUrl: './near-me-map.component.html',
  styleUrl: './near-me-map.component.css'
})
export class NearMeMapComponent implements OnInit {
  map: L.Map | any;
  marker: L.Marker | any;

  myLongitude: number | undefined
  myLatitude: number | undefined

  events: EventInterface[] = []

  polyline: L.Polyline | undefined;
  private markers: Map<number, L.Marker> = new Map();
  selectedEventId: number | null = null; 

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
      iconUrl: 'assets/map-icons/location-home.png',
      iconSize: [27, 36],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
    });

    L.marker([this.myLatitude!!, this.myLongitude!!], { icon: myIcon }).addTo(this.map)
      .bindPopup('You are here!')

    this.mapCoordinates()
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


  private mapCoordinates() {
    var eventIcon = L.icon({
      iconUrl: 'assets/map-icons/location-pin.png',
      iconSize: [40, 41],
      iconAnchor: [12, 41],
      popupAnchor: [8, -34],
      tooltipAnchor: [16, -28],
    });

    for (const e of this.events) {

      let thumbnail

      this.eventService.getThumbnail(e.id).subscribe(
        (response: any) => {
          const blob = new Blob([response], { type: 'image/jpeg' });
          thumbnail = URL.createObjectURL(blob)

          if (e.latitude != '' && e.longitude != '') {
            const marker = L.marker([Number.parseFloat(e.latitude), Number.parseFloat(e.longitude)], { icon: eventIcon }).addTo(this.map)
              .bindPopup(`
            <head> 
              <style>
                img{
                  border-radius: 5px;
                }
                .button-link{
                  width: 100%;
                  margin-top: 5px;
                  display: inline-block;
                  padding: 7px 20px;
                  font-size: 16px;
                  color: white;
                  background-color: blueviolet;
                  border: none;
                  border-radius: 5px;
                  text-align: center;
                  text-decoration: none;
                  cursor: pointer;
                  transition: background-color 0.3s ease;
                }
                .button-link:hover {
                  background-color: darkviolet;
                }
                
                .button-link:active {
                  background-color: rebeccapurple;
                }

                #price{
                  background-color: #bdffcc;
                  padding: 2px 8px;
                  border-radius: 10px;
                }

                #distance{
                  background-color: rgb(255, 200, 200);
                  padding: 2px 8px;
                  border-radius: 10px;
                }
              </style>
            </head>
            <div style="display: flex; gap: 15px;">
              <div style="width: 50%;">
                <img src='${thumbnail}' alt="andrej" width="150px" height="150px"></img>
                <a href="http://localhost:4200/events/${e.id}" style="color:white;" class="button-link">
                  View details
                </a>
              </div>
          
              <div style="width: 50%;">
                <h6 style="color: gray; font-size: 12px; margin-bottom: 0px;">${e.category}</h6>
                <hr style="margin: 3px 0;">

                <h4 style="overflow: hidden; height: 30px;">${e.name}</h4>
                <h6 style="color: gray; font-size: 14px; margin-bottom: 10px; overflow: hidden; height: 53px;">${e.description}</h6>
                <p style="margin:5px 0;">Tickets: ${e.availableTickets == 0 ? '<span style="color: red;"><b>SOLD OUT!</b></span>' : '<b>' + e.availableTickets + '</b>'}</p>
                <h6 style="display: flex; justify-content: space-between;"><span id="price">${e.price == 0 ? 'Free' : '$' + e.price}</span>  <span id="distance">${this.calculateDistance(e)} km.</span></h6>

                <hr style="margin: 3px 0;">
                 <h6 style="color: gray; font-size: 12px; margin-bottom: 0px;">By ${e.creator.firstName} ${e.creator.lastName}</h6>
              </div>
            </div>

            <script>
              showRoute(){
                console.log(1)
              }
            </script>
            `)
            this.markers.set(e.id, marker);
          }
        }
      )
    };
  }

  zoomOnEvent(lat: string, lon: string, id: number) {

    const marker = this.markers.get(id);
    if (marker && this.map) {
      const latLng = marker.getLatLng();
      this.map.setView(latLng, 16, { animate: true });
      setTimeout(() => { marker.openPopup(); }, 400);
    }

  }

  onClick(num: number) {
    console.log(num)
  }

  calculateDistance(e: EventInterface): string {

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

  search(value: string) {
    this.eventService.getEvents().subscribe(
      (e) => {
        this.events = e
        this.mapCoordinates()
      }
    )
  }

  selectEvent(id: number) {
    this.selectedEventId = id;
  }

  sortDistance(value: string) {

  }

}
