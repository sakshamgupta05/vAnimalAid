import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { LegalService } from '../../../services/legal.service';
import { ValidateService } from '../../../services/validate.service';
let config = require('../../../../config.js')
import { Router } from '@angular/router';
declare var Materialize: any;

const URL = config.host + 'api/legal/upload';

@Component({
  selector: 'app-add-legal',
  templateUrl: './add-legal.component.html',
  styleUrls: ['./add-legal.component.scss']
})
export class AddLegalComponent implements OnInit {
  title: String;

  authtoken: any;

  public uploader:FileUploader;

  disabled: boolean;

  constructor(
    private service: LegalService,
    private validateService: ValidateService,
    private router: Router
  ) {
    this.loadToken();
    this.uploader = new FileUploader({
      url: URL,
      authToken: this.authtoken,
      itemAlias: 'photo',
      filters: [{
        name: 'extension',
          fn: (item: any): boolean => {
          const fileExtension = item.name.slice(item.name.lastIndexOf('.') + 1).toLowerCase();
          return fileExtension === 'pdf' ;
        }
      }]
    });
  }

  ngOnInit() {
    this.disabled = false;
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      let obj = JSON.parse(response)
      this.uploader.clearQueue();
      (<HTMLInputElement>document.getElementById("file")).value = "";
      (<HTMLInputElement>document.getElementById("filename")).value = "";
      if (obj.success) {
        let filename = obj.msg;
        let details = {
          title: this.title,
          filename: filename
        }
        this.service.addLegal(details).subscribe(data => {
        this.disabled = false;
          if(data.success) {
            Materialize.toast(data.msg, 4000);
            this.router.navigate(['/admin/legal']);
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
    if(!this.validateService.validateField(this.title)) {
      Materialize.toast('Please fill all the fields', 4000);
      return false;
    }

    if (this.uploader.queue.length == 0) {
      Materialize.toast('Select a pdf file', 4000);
      return;
    }

    this.disabled = true;
    this.uploader.queue[this.uploader.queue.length-1].upload()
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authtoken = token;
  }

}
