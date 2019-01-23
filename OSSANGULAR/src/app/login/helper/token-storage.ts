import { Injectable } from '@angular/core';


const TOKEN_KEY = 'userToken';

@Injectable()
export class TokenStorage {
  token:any;
    constructor() { }

  signOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.clear();
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