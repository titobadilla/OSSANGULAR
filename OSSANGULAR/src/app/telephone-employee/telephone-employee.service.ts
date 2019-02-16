import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TelephoneEmployee } from 'src/model/telephoneemployee.model';

@Injectable({
  providedIn: 'root'
})
export class TelephoneEmployeeService {

  URLAPI=environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllTelephones(): Observable<TelephoneEmployee[]>{
    return this.http.get<TelephoneEmployee[]>(this.URLAPI+'telephoneemployee/');
}

public insertWorkOrder(telephoneEmployee: TelephoneEmployee):Observable<TelephoneEmployee>{
    return this.http.post<TelephoneEmployee>(this.URLAPI+'telephoneemployee/', telephoneEmployee);
}

public getByIdTelephone(id: number):Observable<TelephoneEmployee>{
    return this.http.get<TelephoneEmployee>(this.URLAPI+'telephoneemployee/'+id);
}

public updateWorkOrder(telephoneEmployee:TelephoneEmployee):Observable<TelephoneEmployee>{
  return this.http.put<TelephoneEmployee>(this.URLAPI+'telephoneemployee/' + telephoneEmployee.id, telephoneEmployee);
}
}
