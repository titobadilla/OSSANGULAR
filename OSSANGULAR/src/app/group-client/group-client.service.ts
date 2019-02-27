import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/model/client.model';
import { Observable } from 'rxjs';
import { GroupClient } from 'src/model/groupclient.model';

@Injectable({
  providedIn: 'root'
})
export class GroupClientService {

  URLAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllGroupsClients(): Observable<GroupClient[]> {
    return this.http.get<GroupClient[]>(this.URLAPI+'groupclient/');
  }

  public insertGroupClient(groupClient: GroupClient):Observable<GroupClient> {
    return this.http.post<GroupClient>(this.URLAPI+'groupclient/',groupClient);
  }

  public updateGroupClient(client: GroupClient):Observable<GroupClient> {
    return this.http.put<GroupClient>(this.URLAPI+'groupclient/',client);
  }

  public deleteGroupClient(groupClientId: number) {
    return this.http.delete<GroupClient>(this.URLAPI+'groupclient/'+groupClientId);
  }

  public getByIdGroupClient(groupClientId: number) {
        return this.http.get<GroupClient>(this.URLAPI+'groupclient/'+groupClientId);
  }

  public getAllHeadClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.URLAPI + 'groupclient/headClients');
  }

  public getClientsOfHeadClient(id: String): Observable<Client[]> {
    return this.http.get<Client[]>(this.URLAPI + 'groupclient/clientsOfheadClients/'+id);
  }
}
