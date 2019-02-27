import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { MeasurementUnit } from 'src/model/measurementunit.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitService {
  URLAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public insertMeasurementUnit(category: MeasurementUnit): Observable<MeasurementUnit> {
    return this.http.post<MeasurementUnit>(this.URLAPI + 'measurementunit/', category);
  }

  public getAllMeasurementUnit(): Observable<MeasurementUnit[]> {
    return this.http.get<MeasurementUnit[]>(this.URLAPI + 'measurementunit/');
  }

  public getByIdMeasurementUnit(categoryID:number):Observable<MeasurementUnit>{
    return this.http.get<MeasurementUnit>(this.URLAPI+'measurementunit/'+categoryID);
  }

  public updateMeasurementUnit(category:MeasurementUnit):Observable<MeasurementUnit>{
    return this.http.put<MeasurementUnit>(this.URLAPI+'measurementunit/',category);
  }

  public deleteMeasurementUnit(categoryID:number):Observable<MeasurementUnit>{
    return this.http.delete<MeasurementUnit>(this.URLAPI+'measurementunit/'+categoryID);
  }
}
