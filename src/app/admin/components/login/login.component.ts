import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
declare var Materialize: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;

  disabled: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private validateService: ValidateService
  ) { }

  ngOnInit() {
    this.disabled = false;
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    }

    if(!this.validateService.validateField(user.email)
      || !this.validateService.validateField(user.password)) {
      Materialize.toast('Please fill all the fields', 4000);
      return false;
    }

    this.disabled = true;
    this.authService.authenticateUser(user).subscribe(data => {
      this.disabled = false;
      if(data.success) {
        this.authService.storeUserData(data.token, data.user);
        Materialize.toast('You are now logged in', 4000);
        this.router.navigate(['/admin']);
      } else {
        Materialize.toast(data.msg, 4000);
      }
    });
  }

}
