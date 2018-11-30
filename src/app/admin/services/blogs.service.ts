import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
let config = require('../../config.js')

@Injectable()
export class BlogsService {
  private server: string = config.host;

  // Router
  private router: string = "api/blog/";

  authtoken: any;

  constructor(private http: Http) { }

  getBlogs(page) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.server + this.router + page +'/', {headers: headers})
      .map(res => res.json());
  }

  getBlogById(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.server + this.router + 'post/' + id +'/', {headers: headers})
      .map(res => res.json());
  }

  addBlog(blog) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authtoken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.server + this.router +'add/', blog, {headers: headers})
      .map(res => res.json());
  }

  editBlog(blog) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authtoken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.server + this.router +'edit/', blog, {headers: headers})
      .map(res => res.json());
  }

  deleteBlog(id) {
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
