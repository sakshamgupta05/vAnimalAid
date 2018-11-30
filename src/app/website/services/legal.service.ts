import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
let config = require('../../config.js')

@Injectable()
export class LegalService {
  private server: string = config.host;

  // Router
  private router: string = "api/legal/";

  constructor(private http: Http) { }

  getLegal() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.server + this.router, {headers: headers})
      .map(res => res.json());
  }

}
