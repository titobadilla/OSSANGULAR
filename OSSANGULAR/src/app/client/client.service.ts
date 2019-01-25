import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from '../login/helper/token-storage';
import { Client } from 'src/model/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

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

  public getAllClients(): Observable<Client[]> {
    this.getTokenHeader();
    return this.http.get<Client[]>(this.URLAPI+'client/', { headers: this.reqHeader });
  }

  public insertClient(client: Client):Observable<Client> {
    this.getTokenHeader();
    return this.http.post<Client>(this.URLAPI+'client/',client, { headers: this.reqHeader } );
  }

  public updateClient(client: Client):Observable<Client> {
    this.getTokenHeader();
    return this.http.put<Client>(this.URLAPI+'client/',client, { headers: this.reqHeader });
  }

  public deleteClient(clientId: string) {
    this.getTokenHeader();
    return this.http.delete<Client>(this.URLAPI+'client/'+clientId, { headers: this.reqHeader });
  }

  public getByIdClient(clientId: String) {
    this.getTokenHeader();
    return this.http.get<Client>(this.URLAPI+'client/'+clientId, { headers: this.reqHeader });
  }


  

}
