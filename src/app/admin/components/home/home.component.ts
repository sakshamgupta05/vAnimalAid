import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
declare var Materialize: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User = new User();
  currentPassword: String;
  newPassword: String;
  newPassword2: String;

  disabled: boolean;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.disabled = false;
    this.authService.getProfile().subscribe(profile => {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("content").style.display = "block";
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  changePassword() {
    const request = {
      email: this.user.email,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }

    if(!this.validateService.validateField(request.currentPassword)) {
      Materialize.toast('Field is empty', 4000);
      return false;
    }

    if(!this.validateService.validateField(request.newPassword)) {
      Materialize.toast('Field is empty', 4000);
      return false;
    }

    if(!this.validateService.validatePassword(request.newPassword)) {
      Materialize.toast('Password should have atleast 6 characters', 4000);
      return false;
    }

    if(!this.validateService.confirmPassword(request.newPassword, this.newPassword2)) {
      Materialize.toast('Passwords do not match', 4000);
      return false;
    }

    this.disabled = true;
    this.authService.changePassword(request).subscribe(data => {
      this.disabled = false;
      if(data.success) {
        Materialize.toast(data.msg, 4000);
        (<HTMLFormElement>document.getElementById("changePasswordForm")).reset();
      } else {
        Materialize.toast(data.msg, 4000);
      }
    });
  }

}

class User {
  name: string;
  email: string;

  constructor() {
    this.name = '';
    this.email = '';
  }

}
