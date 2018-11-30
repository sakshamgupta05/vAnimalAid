import { Component, OnInit } from '@angular/core';
import { HospitalsService } from '../../../services/hospitals.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ValidateService } from '../../../services/validate.service';
declare var Materialize: any;

@Component({
  selector: 'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls: ['./edit-hospital.component.scss']
})
export class EditHospitalComponent implements OnInit {
  contact: string;

  _id: string;
  name: string;
  address: string;
  contacts: Array<string>;
  lat: number;
  lng: number;

  disabled: boolean;

  constructor(
    private route: ActivatedRoute,
    private service: HospitalsService,
    private router: Router,
    private validateService: ValidateService
  ) { }

  ngOnInit() {
    this.disabled = false;
    Materialize.updateTextFields();

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.service.getHospitalById(params.get('id'))
      })
      .subscribe((hospital: Hospital) => {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("content").style.display = "block";
        this._id = hospital._id;
        this.name = hospital.name;
        this.address = hospital.address;
        this.contacts = hospital.contact;
        if (hospital.location) {
          this.lat = hospital.location.lat;
          this.lng = hospital.location.lng;
        }
      });
  }

  onSubmit() {
    if (this.lat || this.lng) {
      const hospital = {
        _id: this._id,
        name: this.name,
        address: this.address,
        contact: this.contacts,
        location: {
          lat: this.lat,
          lng: this.lng
        }
      }

      if(!this.validateService.validateField(hospital.name)) {
        Materialize.toast('Field is empty', 4000);
        return false;
      }
      if(!this.validateService.validateField(hospital.address)) {
        Materialize.toast('Field is empty', 4000);
        return false;
      }

      if(!this.validateService.validateField(hospital.location.lat)) {
        Materialize.toast('Field is empty', 4000);
        return false;
      }
      if(!this.validateService.validateField(hospital.location.lng)) {
        Materialize.toast('Field is empty', 4000);
        return false;
      }

      this.disabled = true;
      this.service.editHospital(hospital).subscribe(data => {
        this.disabled = false;
        if(data.success) {
          Materialize.toast(data.msg, 4000);
          this.router.navigate(['/admin/hospitals']);
        } else {
          Materialize.toast(data.msg, 4000);
        }
      });
    } else {
      const hospital = {
        _id: this._id,
        name: this.name,
        address: this.address,
        contact: this.contacts
      }

      if(!this.validateService.validateField(hospital.name)) {
        Materialize.toast('Field is empty', 4000);
        return false;
      }
      if(!this.validateService.validateField(hospital.address)) {
        Materialize.toast('Field is empty', 4000);
        return false;
      }

      this.disabled = true;
      this.service.editHospital(hospital).subscribe(data => {
        this.disabled = false;
        if(data.success) {
          Materialize.toast(data.msg, 4000);
          this.router.navigate(['/admin/hospitals']);
        } else {
          Materialize.toast(data.msg, 4000);
        }
      });
    }
  }

  addContact() {
    if (this.contact) {
      this.contacts.push(this.contact);
      this.contact = '';
    } else {
      Materialize.toast('Field is empty', 4000);
    }
  }

  removeContact(i: number) {
    this.contacts.splice(i, 1);
  }

}

class Hospital {
  _id: string;
  name: string;
  address: string;
  contact: Array<string>;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
  }
}
