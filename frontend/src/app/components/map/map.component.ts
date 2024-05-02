// import { Component, OnInit } from '@angular/core';
// import * as L from 'leaflet'

// @Component({
//   selector: 'app-map',
//   standalone: true,
//   imports: [],
//   templateUrl: './map.component.html',
//   styleUrl: './map.component.css'
// })
// export class MapComponent implements OnInit {

//   private map: L.Map| any
//   private centroid: L.LatLngExpression = [42.3601, -71.0589]; 

//   private initMap(): void {
//     this.map = L.map('map', {
//       center: this.centroid,
//       zoom: 12
//     }
//   );

//     const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 18,
//       minZoom: 10,
//       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     });

//     // create 5 random jitteries and add them to map
//     const jittery = Array(5).fill(this.centroid).map( 
//         x => [x[0] + (Math.random() - .5)/10, x[1] + (Math.random() - .5)/10 ]
//       ).map(
//         x => L.marker(x as L.LatLngExpression)
//       ).forEach(
//         x => x.addTo(this.map)
//       );

//     tiles.addTo(this.map);
  
//   }

//   constructor() { }
  
//   ngOnInit(): void {
//     this.initMap();
//   }

// }


import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  map: L.Map|any;
  marker: L.Marker|any;
  lat: any
  lng: any
  // @Output() lattitudeEvent = new EventEmitter<string>();
  @Output() longitudeEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
  }

  private initializeMap() {
    this.map = L.map('map').setView([41.9944, 21.4146], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', this.onMapClick.bind(this));
  }

  private onMapClick(e: L.LeafletMouseEvent) {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker(e.latlng).addTo(this.map);
    this.displayCoordinates(e.latlng);
  }

  private displayCoordinates(latlng: L.LatLng) {
    this.lat = latlng.lat.toFixed(4);
    this.lng = latlng.lng.toFixed(4);
    
    // this.lattitudeEvent.emit(this.lattitude)
    this.longitudeEvent.emit({'lng' : this.lng, 'lat': this.lat})
  }
}
