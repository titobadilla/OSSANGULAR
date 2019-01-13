import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TelephoneEmployeeService {

  private requestMapping = 'telephoneemployee';
  private url = environment.apiUrl + this.requestMapping;

  constructor(private http: HttpClient) { }
}
