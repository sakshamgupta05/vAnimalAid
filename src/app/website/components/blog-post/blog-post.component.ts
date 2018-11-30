import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BlogsService } from '../../services/blogs.service';

const marked = require('marked');

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  blog: Blog = new Blog();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BlogsService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getBlogById(params.get('id')))
      .subscribe((blog:Blog) => {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("content").style.display = "block";
        this.blog = blog
        this.updateOutput();
      });
    }

    updateOutput() {
      this.blog.body = marked(this.blog.body);
    }
  }

  class Blog {
  _id: string;
  title: string;
  date: Date;
  body: string;
  author: string;

  constructor() {
    this.title = '';
    this.date = new Date();
    this.body = '';
    this.author = '';
  }

}
