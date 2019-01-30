import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkOrderType } from 'src/model/workordertype.model';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderTypeService {

  URLAPI=environment.apiUrl;
  
  constructor(private http: HttpClient) { }



  public getAllWorkOrdersType():Observable<WorkOrderType[]>{
    return this.http.get<WorkOrderType[]>(this.URLAPI+'workordertype/');
  }
}
