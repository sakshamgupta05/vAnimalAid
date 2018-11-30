import { Component, OnInit } from '@angular/core';
import { HospitalsService } from '../../services/hospitals.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {
  index: number;
  hospitals: Array<any>;

  lat: number;
  lng: number;
  zoom: number = 13;

  constructor(
    private hospitalsService: HospitalsService
  ) { }

  ngOnInit() {
    this.hospitalsService.getAllHospitals().subscribe(hospitals => {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("content").style.display = "block";
      this.hospitals = hospitals;
      this.lat = hospitals[0].location.lat;
      this.lng = hospitals[0].location.lng;
      this.index = 0;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  showMarker(location, i) {
    this.lat = location.lat;
    this.lng = location.lng;
    this.index = i;
  }

}
