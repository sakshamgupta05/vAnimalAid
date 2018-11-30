import { Component, OnInit } from '@angular/core';
import { LegalService } from '../../services/legal.service';
import { Router } from '@angular/router';
declare var Materialize: any;

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {
  legalList: Array<any>;

  constructor(
    private service: LegalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.getLegal().subscribe(legalList => {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("content").style.display = "block";
      this.legalList = legalList;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  delete(id: string, filename: string) {
    if (confirm("Do you want to delete?") == false) return

    document.getElementById("preloader").style.display = "block";
    document.getElementById("content").style.display = "none";
    let obj = {
      id: id,
      filename: filename
    }
    this.service.deleteLegal(obj).subscribe(data => {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("content").style.display = "block";
      if(data.success) {
        Materialize.toast(data.msg, 4000);
        this.service.getLegal().subscribe(legalList => {
          this.legalList = legalList;
        },
        err => {
          console.log(err);
          return false;
        });
      } else {
        Materialize.toast(data.msg, 4000);
      }
    });
  }

  addLegal() {
    this.router.navigate(['/admin/legal/add']);
  }

}
