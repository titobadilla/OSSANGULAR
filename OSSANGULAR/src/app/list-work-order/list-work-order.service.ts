import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListWorkOrder } from 'src/model/listworkorder.model';

@Injectable({
  providedIn: 'root'
})
export class ListWorkOrderService {

  URLAPI=environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllLists(): Observable<ListWorkOrder[]> {
    return this.http.get<ListWorkOrder[]>(this.URLAPI+'listworkorder/');
  }
}
