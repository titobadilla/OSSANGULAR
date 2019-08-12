import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

import { WorkOrder } from 'src/model/workOrder.model';
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

  public getAllWorkOrdersByFilter(): Observable<WorkOrder[]>{
    return this.http.get<WorkOrder[]>(this.URLAPI+'workorder/filter');
}

  public insertWorkOrder(workOrder: WorkOrder):Observable<WorkOrder>{
      return this.http.post<WorkOrder>(this.URLAPI+'workorder/', workOrder);
  }

  public getByIdWorkOrder(id: number):Observable<WorkOrder>{
      return this.http.get<WorkOrder>(this.URLAPI+'workorder/'+id);
  }

  public getWorkOrderByStartDate(date: String):Observable<WorkOrder[]>{
    return this.http.get<WorkOrder[]>(this.URLAPI+'workorder/findworkorderbystartdate/'+date);
}

public getWorkOrderByWeekWithStartDateAndEndDate(dateStart: String,dateEnd:String):Observable<WorkOrder[]>{
  return this.http.get<WorkOrder[]>(this.URLAPI+'workorder/findworkorderbyweekwithstartdateandenddate/'+dateStart+'/'+dateEnd);
}

public getWorkOrderByMonth(date: String):Observable<WorkOrder[]>{
  return this.http.get<WorkOrder[]>(this.URLAPI+'workorder/findworkorderbymonthandyear/'+date);
}


  public updateWorkOrder(workOrder:WorkOrder):Observable<WorkOrder>{
    return this.http.put<WorkOrder>(this.URLAPI+'workorder/' + workOrder.id, workOrder);
  }

  public getReportByTypeAndDate(id:number,startDate: String,endDate:String):Observable<any[]>{
    return this.http.get<any[]>(this.URLAPI+'workorder/reportbytypedate/'+id+'/'+startDate+'/'+endDate);
  }

  public getReportByClientAndDate(id:number,startDate: String,endDate:String):Observable<any[]>{
    return this.http.get<any[]>(this.URLAPI+'workorder/reportbyclientdate/'+id+'/'+startDate+'/'+endDate);
  }

  

}
