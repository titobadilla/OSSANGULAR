import { Injectable } from '@angular/core';
import { EventEmitterLogoutService } from '../event-emitter-logout.service';
import { JwtHelper } from './jwt-helper';


const TOKEN_KEY = 'userToken';

@Injectable()
export class TokenStorage {
  token:any;
    constructor(private emitterService:EventEmitterLogoutService,private jwt:JwtHelper) { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
    this.emitterService.setSessionClosedByUser(true);
  }

  signOutSystem() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
    this.emitterService.setSessionClosedBySystem(true);
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    this.token=sessionStorage.getItem(TOKEN_KEY);
    return this.token=!null?this.token:null;
  }

  
}