import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
let config = require('../../config.js')

@Injectable()
export class BlogsService {
  private server: string = config.host;

  // Router
  private router: string = "api/blog/";

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

}
