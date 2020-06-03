import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TodoRouteGuardService implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (
      this.cookieService.get('authToken') === undefined ||
      this.cookieService.get('authToken') === '' ||
      this.cookieService.get('authToken') === null
    ) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
