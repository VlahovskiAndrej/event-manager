import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() editLon: string|undefined
  @Input() editLat: string|undefined
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

    if (this.editLat != undefined && this.editLon != undefined){
      this.marker = L.marker([Number.parseFloat(this.editLat!!), Number.parseFloat(this.editLon!!)]).addTo(this.map)
      // this.lat = Number.parseFloat(this.editLat!!).toFixed(4);
      // this.lng = Number.parseFloat(this.editLon!!).toFixed(4);
      // this.longitudeEvent.emit({'lng' : this.lng, 'lat': this.lat})
    }

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
