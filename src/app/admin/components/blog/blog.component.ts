import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BlogsService } from '../../services/blogs.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs: Array<any>;
  total: number;
  page: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BlogsService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.page = parseInt(params.get('page'));
        return this.service.getBlogs(params.get('page'));
      })
      .subscribe(object => {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("content").style.display = "block";
        this.total = object.total;
        this.blogs = object.blogs
    });
  }

  onSelect(blog) {
    this.router.navigate(['/admin/blog/post', blog._id]);
  }

  addBlog() {
    this.router.navigate(['/admin/blog/add']);
  }


  navigate(selectPage) {
    this.router.navigate(['/admin/blog/', selectPage]);
  }

  navigateBack() {
    if((this.page-1)>0) {
      this.router.navigate(['/admin/blog/', this.page-1]);
    }
  }

  navigateForward() {
    if((this.total-(5*(this.page)))>0) {
      this.router.navigate(['/admin/blog/', this.page+1]);
    }
  }

}
