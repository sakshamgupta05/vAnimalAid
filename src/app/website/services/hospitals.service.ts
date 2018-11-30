import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
let config = require('../../config.js')

@Injectable()
export class HospitalsService {
  private server: string = config.host;

  // Router
  private router: string = "api/hospitals/";

  constructor(private http: Http) { }

  getAllHospitals() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.server + this.router, {headers: headers})
      .map(res => res.json());
  }

}
