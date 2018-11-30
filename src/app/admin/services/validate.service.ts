import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePassword(password) {
    return password.length >= 6;
  }

  validateField(str) {
    return str;
  }

  confirmPassword(password, password2) {
    return password === password2;
  }

}
