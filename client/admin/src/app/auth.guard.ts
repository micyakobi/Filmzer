import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private rout: Router) { }
  canActivate() {

    if (localStorage.getItem('isLoggedin')) {
      return true;
    }
    this.rout.navigate(['/login']);
    return false;
  }

}
