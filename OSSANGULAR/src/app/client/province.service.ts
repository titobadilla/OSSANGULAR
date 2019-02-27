import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Province } from 'src/model/province.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  URLAPI=environment.apiUrl;


  constructor(private http: HttpClient) { }

  public getAllProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(this.URLAPI+'province/');
  }
  

}
