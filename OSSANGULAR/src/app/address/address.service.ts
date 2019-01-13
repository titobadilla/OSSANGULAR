import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private requestMapping = 'address';
  private url = environment.apiUrl + this.requestMapping;

  constructor(private http: HttpClient) { }
}
