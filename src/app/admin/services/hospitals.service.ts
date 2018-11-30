import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt';
let config = require('../../config.js')

@Injectable()
export class HospitalsService {
  private server: string = config.host;

  // Router
  private router: string = "api/hospitals/";

  authtoken: any;

  constructor(private http: Http) { }

  getAllHospitals() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.server + this.router +'', {headers: headers})
      .map(res => res.json());
  }

  getHospitalById(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.server + this.router + 'hospital/' + id +'/', {headers: headers})
      .map(res => res.json());
  }

  addHospital(hospital) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authtoken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.server + this.router +'add/', hospital, {headers: headers})
      .map(res => res.json());
  }

  editHospital(hospital) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authtoken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.server + this.router +'edit/', hospital, {headers: headers})
      .map(res => res.json());
  }

  deleteHospital(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authtoken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.server + this.router +'delete/', {"id": id}, {headers: headers})
      .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authtoken = token;
  }

}
