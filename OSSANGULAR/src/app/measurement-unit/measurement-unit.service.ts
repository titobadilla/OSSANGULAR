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

  public insertMeasurementUnit(measurementunit: MeasurementUnit): Observable<MeasurementUnit> {
    return this.http.post<MeasurementUnit>(this.URLAPI + 'measurementunit/', measurementunit);
  }

  public getAllMeasurementUnit(): Observable<MeasurementUnit[]> {
    return this.http.get<MeasurementUnit[]>(this.URLAPI + 'measurementunit/');
  }

  public getByIdMeasurementUnit(measurementUnitID:number):Observable<MeasurementUnit>{
    return this.http.get<MeasurementUnit>(this.URLAPI+'measurementunit/'+measurementUnitID);
  }

  public updateMeasurementUnit(measurementUnit:MeasurementUnit):Observable<MeasurementUnit>{
    return this.http.put<MeasurementUnit>(this.URLAPI+'measurementunit/',measurementUnit);
  }

  public deleteMeasurementUnit(measurementUnitID:number):Observable<MeasurementUnit>{
    return this.http.delete<MeasurementUnit>(this.URLAPI+'measurementunit/'+measurementUnitID);
  }
}
