import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    jQuery('.button-collapse').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: true,
      draggable: true,
      onOpen: function(el) {},
      onClose: function(el) {},
    });
  }

  onLogoutClick() {
    this.authService.logout();
    Materialize.toast('You are logged out', 4000);
    this.router.navigate(['/admin/login']);
    return false;
  }

}
