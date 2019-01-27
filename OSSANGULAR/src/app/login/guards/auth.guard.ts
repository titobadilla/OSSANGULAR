import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { EventEmitterLogoutService } from '../event-emitter-logout.service';
import { TokenStorage } from '../helper/token-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthService,private router: Router,private token:TokenStorage) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.isAuthenticated()){
      this.router.navigate(['login']);
      return false;
    }else if(this.auth.isAuthenticated() && this.auth.isTokenExpired()){
      this.router.navigate(['login']);      
      return false;
    }else{
    return true;
    }
  }
}
