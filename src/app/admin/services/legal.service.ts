import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt';
let config = require('../../config.js')

@Injectable()
export class LegalService {
  private server: string = config.host;

  // Router
  private router: string = "api/legal/";

  authtoken: any;

  constructor(private http: Http) { }

  getLegal() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.server + this.router, {headers: headers})
      .map(res => res.json());
  }

  addLegal(legal) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authtoken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.server + this.router +'add/', legal, {headers: headers})
      .map(res => res.json());
  }

  deleteLegal(obj) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authtoken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.server + this.router +'delete/', obj, {headers: headers})
      .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authtoken = token;
  }

}
