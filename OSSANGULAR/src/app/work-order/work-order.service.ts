import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

import { WorkOrder } from 'src/model/workorder.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  URLAPI=environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllWorkOrders(): Observable<WorkOrder[]>{
      return this.http.get<WorkOrder[]>(this.URLAPI+'workorder/');
  }

  public insertWorkOrder(workOrder: WorkOrder):Observable<WorkOrder>{
      return this.http.post<WorkOrder>(this.URLAPI+'workorder/', workOrder);
  }
}
