import { Component, OnInit } from '@angular/core';
import {KeycloakService} from '../keycloak.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private profile: any = {};

  constructor(private kcService: KeycloakService) { }

  ngOnInit() {
    this.kcService.loadProfile().then(user => {
      this.profile = user;
    });
  }

  onLogin() {
    this.kcService.login();
  }

  onLogout() {
    this.kcService.logout();
  }

}
