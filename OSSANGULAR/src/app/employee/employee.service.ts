import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/model/employee.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URLAPI=environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.URLAPI+'employee/');
  }

  
  public insertEmployee(employee: Employee):Observable<Employee>{
      return this.http.post<Employee>(this.URLAPI+'employee/', employee);
  }

  public getByIdEmployee(id: String):Observable<Employee>{
      return this.http.get<Employee>(this.URLAPI+'employee/'+id);
  }

  
  public updateEmployee(employee:Employee):Observable<Employee>{
    return this.http.put<Employee>(this.URLAPI+'employee/' + employee.id, employee);
  }

}
