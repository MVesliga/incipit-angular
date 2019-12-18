import {Component, OnInit} from '@angular/core';
import {KeycloakService} from './keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'incipit-angular';
  private profile: any = {};
  constructor(private kcService: KeycloakService) {
  }

  ngOnInit(): void {
    this.kcService.loadProfile().then(user => {
      this.profile = user;
      console.log(this.profile);
    });

  }
}
