import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from '../login/helper/token-storage';
import { Client } from 'src/model/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  URLAPI=environment.apiUrl;


  constructor(private http: HttpClient,private token:TokenStorage) { }

  public getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.URLAPI+'client/');
  }

  public getClientsWithoutGroup(): Observable<Client[]> {
    return this.http.get<Client[]>(this.URLAPI+'client/withoutgroup');
  }

  public insertClient(client: Client):Observable<Client> {
    return this.http.post<Client>(this.URLAPI+'client/',client);
  }

  public updateClient(client: Client):Observable<Client> {
    return this.http.put<Client>(this.URLAPI+'client/',client);
  }

  public deleteClient(clientId: String) {
    return this.http.delete<Client>(this.URLAPI+'client/'+clientId);
  }

  public getByIdClient(clientId: String) {
        return this.http.get<Client>(this.URLAPI+'client/'+clientId);
  }


  

}
