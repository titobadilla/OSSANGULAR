import { Injectable } from '@angular/core';
import { Environment } from '../app.environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListWorkOrderService {

  private requestMapping = 'listworkorder';
  private url = Environment.apiUrl + this.requestMapping;

  constructor(private http: HttpClient) { }
}
