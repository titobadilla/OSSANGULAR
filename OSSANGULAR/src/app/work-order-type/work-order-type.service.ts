import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from '../login/helper/token-storage';
import { Observable } from 'rxjs';
import { WorkOrderType } from 'src/model/workordertype.model';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderTypeService {

  URLAPI=environment.apiUrl;
  
  reqHeader:any;
  tokenCrypt:any

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
  constructor(private http: HttpClient,private token:TokenStorage) { }



  public getAllWorkOrdersType():Observable<WorkOrderType[]>{
    this.getTokenHeader();
    
    return this.http.get<WorkOrderType[]>(this.URLAPI+'workordertype/', { headers: this.reqHeader });
  }
}
