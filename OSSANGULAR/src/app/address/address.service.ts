import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../app.environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private requestMapping = 'address';
  private url = Environment.apiUrl + this.requestMapping;

  constructor(private http: HttpClient) { }
}
