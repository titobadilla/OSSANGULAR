import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Canton } from 'src/model/canton.model';

@Injectable({
  providedIn: 'root'
})
export class CantonService {

  URLAPI=environment.apiUrl;


  constructor(private http: HttpClient) { }

  public getAllCantons(): Observable<Canton[]> {
    return this.http.get<Canton[]>(this.URLAPI+'canton/');
  }

  public getAllCantonsByProvince(id:String): Observable<Canton[]> {
    return this.http.get<Canton[]>(this.URLAPI+'canton/cantonsbyprovince/'+id);
  }
  
  

}
