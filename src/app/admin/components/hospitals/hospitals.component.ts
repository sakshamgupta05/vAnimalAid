import { Component, OnInit } from '@angular/core';
import { HospitalsService } from '../../services/hospitals.service';
import { Router } from '@angular/router';
declare var Materialize: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {
  hospitals: Array<any>;

  constructor(
    private service: HospitalsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.getAllHospitals().subscribe(hospitals => {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("content").style.display = "block";
      this.hospitals = hospitals;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  edit(id: string) {
    this.router.navigate(['/admin/hospitals/edit', id]);
  }

  delete(id: string) {
    if (confirm("Do you want to delete?") == false) return

    document.getElementById("preloader").style.display = "block";
    document.getElementById("content").style.display = "none";
    this.service.deleteHospital(id).subscribe(data => {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("content").style.display = "block";
      if(data.success) {
        Materialize.toast(data.msg, 4000);
        this.service.getAllHospitals().subscribe(hospitals => {
          this.hospitals = hospitals;
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

  addHospital() {
    this.router.navigate(['/admin/hospitals/add']);
  }

}
