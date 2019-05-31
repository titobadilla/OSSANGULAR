import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { WorkOrderDetail } from 'src/model/workOrderDetail.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderDetailService {

  URLAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public insertWorkOrderDetail(detail: WorkOrderDetail): Observable<WorkOrderDetail> {
    return this.http.post<WorkOrderDetail>(this.URLAPI + 'workorderdetail/', detail);
  }

  public getAllWorkOrderDetail(): Observable<WorkOrderDetail[]> {
    return this.http.get<WorkOrderDetail[]>(this.URLAPI + 'workorderdetail/');
  }

  public getByIdWorkOrderDetail(detailID: number): Observable<WorkOrderDetail> {
    return this.http.get<WorkOrderDetail>(this.URLAPI + 'workorderdetail/' + detailID);
  }

  public updateWorkOrderDetail(detail: WorkOrderDetail): Observable<WorkOrderDetail> {
    return this.http.put<WorkOrderDetail>(this.URLAPI + 'workorderdetail/', detail);
  }

  public deleteWorkOrderDetail(detailID: number): Observable<WorkOrderDetail> {
    return this.http.delete<WorkOrderDetail>(this.URLAPI + 'workorderdetail/' + detailID);
  }

  public getByDatesWorkOrderDetail(f1:Date, f2:Date): Observable<WorkOrderDetail[]> {
    return this.http.get<WorkOrderDetail[]>(this.URLAPI + 'workorderdetail/search/'+f1+"/"+f2);
  }
}
