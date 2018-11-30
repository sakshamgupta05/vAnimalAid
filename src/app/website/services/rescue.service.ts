import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
let config = require('../../config.js')

@Injectable()
export class RescueService {
  private server: string = config.host;

  // Router
  private router: string = "api/rescue/";

  constructor(private http: Http) { }

  submit(details) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.server + this.router +'submit/', details, {headers: headers})
      .map(res => res.json());
  }

}
