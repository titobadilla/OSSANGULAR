import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenStorage } from '../helper/token-storage';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthService,private router: Router,private token:TokenStorage) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.isAuthenticated()){
      this.router.navigate(['']);
      return false;
    }else if(this.auth.isAuthenticated() && this.auth.isTokenExpired()){
      this.router.navigate(['']);      
      return false;
    }else{
    return true;
    }
  }
}
