import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {CustomerService} from './core/customer.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';

@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private customerService: CustomerService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const redirectUrl = route['_routerState']['url'];

    if (this.customerService.isLogged()) {
	  console.log('logged in auth guard');
	  this.router.navigateByUrl('/counselors');	
      return true;
    }
	else {
	  console.log('not logged in auth guard');
	  this.router.navigateByUrl('/login');
	  return true;
	}

	
/*    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );*/

    //return false;
  }
}