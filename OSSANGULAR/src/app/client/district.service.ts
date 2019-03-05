import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { District } from 'src/model/district.model';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  URLAPI=environment.apiUrl;


  constructor(private http: HttpClient) { }

  public getAllDistricts(): Observable<District[]> {
    return this.http.get<District[]>(this.URLAPI+'district/');
  }
  

  public getAllDistrictsByProvinceAndCanton(idProvince:String,idCanton:String): Observable<District[]> {
    return this.http.get<District[]>(this.URLAPI+'district/districtbyprovinceandcanton/'+idProvince+'/'+idCanton);
  }
  
}
