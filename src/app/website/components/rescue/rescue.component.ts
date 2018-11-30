import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { RescueService } from '../../services/rescue.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
let config = require('../../../config.js')
declare var Materialize: any;
declare var jQuery: any;

const URL = config.host + 'api/rescue/upload';

@Component({
  selector: 'app-rescue',
  templateUrl: './rescue.component.html',
  styleUrls: ['./rescue.component.scss']
})
export class RescueComponent implements OnInit {
  animal: String;
  name: String;
  mobile: String;
  email: String;
  location: String;
  landmark: String;
  message: String;
  public uploader:FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'photo',
    allowedMimeType: ['image/jpeg']
  });

  disabled: boolean;

  constructor(
    private rescueService: RescueService,
    private validateService: ValidateService,
    private router: Router
  ) { }

  ngOnInit() {
    jQuery(document).ready(function(){
      jQuery('.parallax').parallax();
    });
    jQuery(document).ready(function() {
      jQuery('select').material_select();
    });


    this.disabled = false;
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      let obj = JSON.parse(response)
      this.uploader.clearQueue();
      (<HTMLInputElement>document.getElementById("file")).value = "";
      (<HTMLInputElement>document.getElementById("filename")).value = "";
      if (obj.success) {
        let filename = obj.msg;
        let details = {
          animal : this.animal,
          name: this.name,
          mobile: this.mobile,
          email: this.email,
          location: this.location,
          landmark: this.landmark,
          message: this.message,
          filename: filename
        }
        this.rescueService.submit(details).subscribe(data => {
          this.disabled = false;
          if(data.success) {
            Materialize.toast(data.msg, 4000);
            this.router.navigate(['/']);
          } else {
            Materialize.toast(data.msg, 4000);
          }
        });
      } else {
        Materialize.toast(obj.msg, 4000);
        this.disabled = false;
      }
    };
  }

  upload() {
    if(!this.validateService.validateField(this.name)
      || !this.validateService.validateField(this.mobile)
      || !this.validateService.validateField(this.email)
      || !this.validateService.validateField(this.location)
      || !this.validateService.validateField(this.landmark)
      || !this.validateService.validateField(this.message)) {
      Materialize.toast('Please fill all the fields', 4000);
      return false;
    }
    if(!this.validateService.validateEmail(this.email)) {
      Materialize.toast('Please use a valid email', 4000);
      return false;
    }

    if (this.uploader.queue.length == 0) {
      Materialize.toast('Select an image', 4000);
      return;
    }
    if (this.uploader.queue[this.uploader.queue.length-1].file.size/1024/1024 > 10) {
      Materialize.toast('File too large', 4000);
      return;
    }

    let e = <HTMLSelectElement>document.getElementById("animal");
    this.animal = e.options[e.selectedIndex].value;

    if (!this.animal) {
      Materialize.toast('Please fill all the fields', 4000);
      return false;
    }

    this.disabled = true;
    this.uploader.queue[this.uploader.queue.length-1].upload()
  }

}
