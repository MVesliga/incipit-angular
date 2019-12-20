import { Component, OnInit } from '@angular/core';
import {KeycloakService} from '../keycloak.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private profile: any = {};
  private userRoles: [] = [];

  constructor(private kcService: KeycloakService) { }

  ngOnInit() {
    this.kcService.loadProfile().then(user => {
      this.profile = user;
    });

    if (this.kcService.isAuthenticated()) {
      this.userRoles = this.kcService.getUserRoles();
    } else {
      this.userRoles = [];
    }
  }

  onLogin() {
    this.kcService.login();
  }

  onLogout() {
    this.kcService.logout();
  }

}
