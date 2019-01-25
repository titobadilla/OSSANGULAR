import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Employee } from 'src/model/employee.model';
import { Observable } from 'rxjs';
import { TokenStorage } from '../login/helper/token-storage';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

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

  public getAllEmployees(): Observable<Employee[]> {
    this.getTokenHeader();
    return this.http.get<Employee[]>(this.URLAPI+'employee/', { headers: this.reqHeader });
  }
}
