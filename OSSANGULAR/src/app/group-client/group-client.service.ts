import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/model/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupClientService {

  URLAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllHeadClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.URLAPI + 'groupclient/headClients');
  }

  public getClientsOfHeadClient(id: String): Observable<Client[]> {
    return this.http.get<Client[]>(this.URLAPI + 'groupclient/clientsOfheadClients/'+id);
  }
}
