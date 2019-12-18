import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {KeycloakService} from './keycloak.service';
import {analyticsPackageSafelist} from '@angular/cli/models/analytics';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private kcService: KeycloakService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.kcService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/not-registered'], {queryParams: {returnUrl: state.url}});
    }
  }
}
