import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from '../login/helper/token-storage';
import { WorkOrder } from 'src/model/workorder.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  reqHeader:any;
  tokenCrypt:any
  URLAPI=environment.apiUrl;

  constructor(private http: HttpClient,private token:TokenStorage) { }

  private getTokenHeader(){
    this.tokenCrypt=this.token.getToken();
    if(this.tokenCrypt!=null){
      this.reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenCrypt
     });
    }
    else{
      this.reqHeader=null;      
    }
  }


  public insertWorkOrder(workOrder: WorkOrder):Observable<WorkOrder>{
    this.getTokenHeader();
      return this.http.post<WorkOrder>(this.URLAPI+'workorder/addWorkOrder', workOrder, { headers: this.reqHeader } );
  }
}
