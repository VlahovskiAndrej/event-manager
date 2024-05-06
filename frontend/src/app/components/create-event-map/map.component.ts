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
    this.longitudeEvent.emit({'lng' : this.lng, 'lat': this.lat})
  }
}
