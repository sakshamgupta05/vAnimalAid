import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BlogsService } from '../../../services/blogs.service';
declare var Materialize: any;

const marked = require('marked');

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {
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

  editBlog() {
    this.router.navigate(['/admin/blog/post/edit', this.blog._id]);
  }

  deleteBlog() {
    if (confirm("Do you want to delete?") == false) return

    document.getElementById("preloader").style.display = "block";
    document.getElementById("content").style.display = "none";
    this.service.deleteBlog(this.blog._id).subscribe(data => {
      if(data.success) {
        Materialize.toast(data.msg, 4000);
        this.router.navigate(['/admin/blog']);
      } else {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("content").style.display = "block";
        Materialize.toast(data.msg, 4000);
      }
    });
  }

}

class Blog {
  _id: string;
  title: string;
  author: string;
  date: Date;
  body: string;

  constructor() {
    this.title = '';
    this.date = new Date();
    this.body = '';
    this.author = '';
  }

}
