import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from '../login/helper/token-storage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Color } from 'src/model/color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorService {


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

  public getAllColors(): Observable<Color[]> {
    this.getTokenHeader();
    return this.http.get<Color[]>(this.URLAPI+'color/', { headers: this.reqHeader });
  }
}