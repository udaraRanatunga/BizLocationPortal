import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn()) {
      return true;
    }
    console.log('redirect login');
    this.router.navigate(['/login']);
    return false;
  }
  public isLoggedIn(): boolean {
    let status = false;
    console.log(localStorage.getItem('socialusers'));
    if (localStorage.getItem('socialusers')) {
      status = true;
    } else {
      status = false;
    }
    return status;
  }
}

