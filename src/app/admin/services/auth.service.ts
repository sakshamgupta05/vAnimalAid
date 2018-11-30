import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Subject } from 'rxjs/Subject';
let config = require('../../config.js')

@Injectable()
export class AuthService {
  authtoken: any;
  user: any;
  public refreshUserSubject = new Subject<any>();

  private server: string = config.host;

  // Router
  private router: string = "api/users/";

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authtoken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.server + this.router +'register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.server + this.router +'authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authtoken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.server + this.router +'profile', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authtoken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authtoken = token;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    this.authtoken = null;
    this.user = null;
    localStorage.clear();
  }

  changePassword(request) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authtoken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.server + this.router +'changepass', request, {headers: headers})
      .map(res => res.json());
  }
}
