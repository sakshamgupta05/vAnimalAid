import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LegalService } from '../../services/legal.service';
declare var jQuery: any;

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {
  legalList: Array<any>;

  constructor(
    private service: LegalService
  ) { }

  ngOnInit() {
    jQuery(document).ready(function(){
      jQuery('.parallax').parallax();
    });

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

}
