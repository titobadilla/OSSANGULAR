
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelper } from './helper/jwt-helper';


import { Employee } from 'src/model/employee.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  credentials:Employee=new Employee();

  URLAPI=environment.apiUrl;
  constructor(private http: HttpClient,public jwtHelper: JwtHelper) {

  }

  public isAuthenticated(): boolean {

    if (localStorage.getItem('userToken') != null) {      
      return true;
    } else {
      return false;
    }
  }

  public isTokenExpired(): boolean {

    const token = localStorage.getItem('userToken');     
      // Check whether the token is expired and return
      // true or false
      return this.jwtHelper.isTokenExpired(token);
  }

  public authentication(username: string, password: string): Observable<any> {

    this.credentials.username=username;
    this.credentials.password=password;
    return this.http.post(this.URLAPI+'token/generate-token', this.credentials);
  }

}
