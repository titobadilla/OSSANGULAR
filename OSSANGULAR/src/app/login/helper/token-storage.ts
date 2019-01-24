import { Injectable } from '@angular/core';
import { EventEmitterLogoutService } from '../event-emitter-logout.service';


const TOKEN_KEY = 'userToken';

@Injectable()
export class TokenStorage {
  token:any;
    constructor(private emitterService:EventEmitterLogoutService) { }

  signOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.clear();
    this.emitterService.setSessionClosedByUser(true);
  }

  signOutSystem() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.clear();
    this.emitterService.setSessionClosedBySystem(true);
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    this.token=localStorage.getItem(TOKEN_KEY);
    return this.token=!null?this.token:null;
  }
}