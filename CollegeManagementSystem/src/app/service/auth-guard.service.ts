import { Injectable } from '@angular/core';
import {  Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _router:Router,private authService:AuthService ) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
  if(sessionStorage.getItem('username')!=='admin'){
    //this._router.navigate(["login1"],{queryParams:{retUrl:route.url}});
    this._router.navigate(["login1"]);
    return false;
  }
  return true;
}
}