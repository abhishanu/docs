import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { CommonService } from './common.service';
@Injectable()
export class AuthGuardService implements CanActivate {
    authInfo = {
      authenticated: false
    };

    constructor(private router: Router, private commonService: CommonService) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        if (!this.authInfo.authenticated) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

    isPinCreated() {
      if ( this.commonService.getAppPin() !== undefined
          || this.commonService.getAppPin() !== null
          || this.commonService.getAppPin() !== '') {
        console.log('pin existed');
        this.authInfo.authenticated = true;
      }
    }
}
