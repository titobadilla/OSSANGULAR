import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkOrderType } from 'src/model/workordertype.model';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderTypeService {

  URLAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllWorkOrdersType(): Observable<WorkOrderType[]> {
    return this.http.get<WorkOrderType[]>(this.URLAPI + 'workordertype/');
  }

  public insertWorkOrderType(type: WorkOrderType): Observable<WorkOrderType> {
    return this.http.post<WorkOrderType>(this.URLAPI + 'workordertype/', type);
  }

  public getByIdWorkOrderType(typeID: number): Observable<WorkOrderType> {
    return this.http.get<WorkOrderType>(this.URLAPI + 'workordertype/' + typeID);
  }

  public updateWorkOrderType(type: WorkOrderType): Observable<WorkOrderType> {
    return this.http.put<WorkOrderType>(this.URLAPI + 'workordertype/', type);
  }


  public deleteWorkOrderType(typeID: number): Observable<WorkOrderType> {
    return this.http.delete<WorkOrderType>(this.URLAPI + 'workordertype/' + typeID);
  }

}
