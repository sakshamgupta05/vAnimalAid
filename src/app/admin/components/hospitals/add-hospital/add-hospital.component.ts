import { Component, OnInit } from '@angular/core';
import { HospitalsService } from '../../../services/hospitals.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../../services/validate.service';
declare var Materialize: any;

@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.scss']
})
export class AddHospitalComponent implements OnInit {
  name: string;
  address: string;
  contacts: Array<string>;
  lat: number;
  lng: number;

  contact: string;

  disabled: boolean;

  constructor(
    private hospitalsService: HospitalsService,
    private router: Router,
    private validateService: ValidateService
  ) { }

  ngOnInit() {
    this.disabled = false;
    this.contacts = [];
  }

  onSubmit() {
    const hospital = {
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

    this.disabled = true;
    this.hospitalsService.addHospital(hospital).subscribe(data => {
      this.disabled = false;
      if(data.success) {
        Materialize.toast(data.msg, 4000);
        this.router.navigate(['/admin/hospitals']);
      } else {
        Materialize.toast(data.msg, 4000);
      }
    });
  }

  addContact() {
    this.contacts.push(this.contact);
    this.contact = '';
  }

  removeContact(i: number) {
    this.contacts.splice(i, 1);
  }

}
