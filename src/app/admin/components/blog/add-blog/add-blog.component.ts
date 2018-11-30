import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../../services/blogs.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../../services/validate.service';
declare var Materialize: any;

const removeMd = require('remove-markdown');
const marked = require('marked');

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  title: string;
  author: string;
  short: string;
  body: string;
  convertedText: string;

  disabled: boolean;

  constructor(
    private blogsService: BlogsService,
    private router: Router,
    private validateService: ValidateService
  ) { }

  ngOnInit() {
    this.disabled = false;
  }

  updateOutput(mdText: string) {
    this.convertedText = marked(mdText);
  }

  onSubmit() {
    const blog = {
      title: this.title,
      author: this.author,
      short: this.short,
      body: this.body
    }

    if(!this.validateService.validateField(blog.title)) {
      Materialize.toast('Field is empty', 4000);
      return false;
    }
    if(!this.validateService.validateField(blog.author)) {
      Materialize.toast('Field is empty', 4000);
      return false;
    }
    if(!this.validateService.validateField(blog.body)) {
      Materialize.toast('Field is empty', 4000);
      return false;
    }

    blog.short = removeMd(blog.body);
    blog.short = blog.short.substring(0, 300);

    this.disabled = true;
    this.blogsService.addBlog(blog).subscribe(data => {
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
