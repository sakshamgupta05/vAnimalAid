import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
declare var Materialize: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  password: String;
  password2: String;

  disabled: boolean;

  constructor(
    private validateService: ValidateService,
     private authService: AuthService,
     private router: Router
   ) { }

  ngOnInit() {
    this.disabled = false;
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateField(user.name)
      || !this.validateService.validateField(user.email)
      || !this.validateService.validateField(user.password)
      || !this.validateService.validateField(this.password2)) {
      Materialize.toast('Please fill all the fields', 4000);
      return false;
    }

    // Validate Fields
    if(!this.validateService.validateEmail(user.email)) {
      Materialize.toast('Please use a valid email', 4000);
      return false;
    }

    if(!this.validateService.validatePassword(user.password)) {
      Materialize.toast('Password should have atleast 6 characters', 4000);
      return false;
    }

    if(!this.validateService.confirmPassword(user.password, this.password2)) {
      Materialize.toast('Passwords do not match', 4000);
      return false;
    }

    // Register User
    this.disabled = true;
    this.authService.registerUser(user).subscribe(data => {
      this.disabled = false;
      if(data.success) {
        Materialize.toast('You are now registeredand can log in', 4000);
        this.router.navigate(['admin']);
      } else {
        Materialize.toast(data.msg, 4000);
      }
    });
  }

}
