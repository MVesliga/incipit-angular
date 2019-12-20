import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

declare let Keycloak: any;

@Injectable()
export class KeycloakService {

  private keycloakAuth: any;
  private userRoles: [] = [];

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        url: 'http://localhost:8180/auth',
        realm: 'incipit',
        clientId: 'demo'
      };
      this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth.init({ onLoad: 'check-sso' })
        .success(() => {
          localStorage.setItem('token', this.getToken());
          resolve();
        })
        .error(() => {
          reject();
        });
    });
  }

  login() {
    this.keycloakAuth.login();

  }

  getToken(): string {
    return this.keycloakAuth.token;
  }

  logout() {
    this.keycloakAuth.logout();
  }

  isAuthenticated() {
    return this.keycloakAuth.authenticated;
  }

  getUserRoles() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.getToken());
    this.userRoles = decodedToken['resource_access'].incipit.roles;

    return this.userRoles;
  }

  loadProfile(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.keycloakAuth.token) {
        this.keycloakAuth
          .loadUserProfile()
          .success(data => {
            resolve(<any>data);
          })
          .error(() => {
            reject('Failed to load profile');
          });
      } else {
        reject('Not loggen in');
      }
    });
  }
}
