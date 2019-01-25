import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from '../login/helper/token-storage';
import { Observable } from 'rxjs';
import { ListWorkOrder } from 'src/model/listworkorder.model';

@Injectable({
  providedIn: 'root'
})
export class ListWorkOrderService {


  reqHeader:any;
  tokenCrypt:any
  URLAPI=environment.apiUrl;

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

  public getAllLists(): Observable<ListWorkOrder[]> {
    this.getTokenHeader();
    return this.http.get<ListWorkOrder[]>(this.URLAPI+'listworkorder/', { headers: this.reqHeader });
  }
}
