import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KitWorkOrder } from 'src/model/kitWorkOrder.model';

@Injectable({
  providedIn: 'root'
})
export class KitWorkOrderService {

  URLAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public insertKitWorkOrder(kit:KitWorkOrder): Observable<KitWorkOrder> {
    return this.http.post<KitWorkOrder>(this.URLAPI + 'kitworkorder/', kit);
  }

  public getAllKitWorkOrder(): Observable<KitWorkOrder[]> {
    return this.http.get<KitWorkOrder[]>(this.URLAPI + 'kitworkorder/');
  }

  public getByIdKitWorkOrder(kitID:number):Observable<KitWorkOrder>{
    return this.http.get<KitWorkOrder>(this.URLAPI+'kitworkorder/'+kitID);
  }

  public updateKitWorkOrder(kit:KitWorkOrder):Observable<KitWorkOrder>{
    return this.http.put<KitWorkOrder>(this.URLAPI+'kitworkorder/',kit);
  }

  
  public deleteKitWorkOrder(kitID:number):Observable<KitWorkOrder>{
    return this.http.delete<KitWorkOrder>(this.URLAPI+'kitworkorder/'+kitID);
  }
}
