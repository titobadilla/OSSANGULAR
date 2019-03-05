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

  public getAllGroups(): Observable<GroupClient[]> {
    return this.http.get<GroupClient[]>(this.URLAPI + 'groupclient/');
  }
}
