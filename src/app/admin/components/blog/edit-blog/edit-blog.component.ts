import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../../services/blogs.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ValidateService } from '../../../services/validate.service';
declare var Materialize: any;

const removeMd = require('remove-markdown');
const marked = require('marked');

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {
  blog: Blog = new Blog();
  convertedText: string;

  disabled: boolean;

  constructor(
    private route: ActivatedRoute,
    private blogsService: BlogsService,
    private router: Router,
    private validateService: ValidateService
  ) { }

  ngOnInit() {
    this.disabled = false;
    Materialize.updateTextFields();

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.blogsService.getBlogById(params.get('id'))
      })
      .subscribe((blog:Blog) => {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("content").style.display = "block";
        this.blog = blog
      });

  }

  updateOutput(mdText: string) {
    this.convertedText = marked(mdText);
  }

  onSubmit() {
    if(!this.validateService.validateField(this.blog.title)) {
      Materialize.toast('Field is empty', 4000);
      return false;
    }
    if(!this.validateService.validateField(this.blog.author)) {
      Materialize.toast('Field is empty', 4000);
      return false;
    }
    if(!this.validateService.validateField(this.blog.body)) {
      Materialize.toast('Field is empty', 4000);
      return false;
    }
    this.blog.short = removeMd(this.blog.body);
    this.blog.short = this.blog.short.substring(0, 300);

    this.disabled = true;
    this.blogsService.editBlog(this.blog).subscribe(data => {
      this.disabled = false;
      if(data.success) {
        Materialize.toast(data.msg, 4000);
        this.router.navigate(['/admin/blog']);
      } else {
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
  short: string;
  body: string;

  constructor() {
    this.title = '';
    this.date = new Date();
    this.body = '';
  }

}
