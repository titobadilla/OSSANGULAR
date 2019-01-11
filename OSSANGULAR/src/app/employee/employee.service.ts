import { Injectable } from '@angular/core';
import { Environment } from '../app.environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private requestMapping = 'employee';
  private url = Environment.apiUrl + this.requestMapping;

  constructor(private http: HttpClient) { }
}
