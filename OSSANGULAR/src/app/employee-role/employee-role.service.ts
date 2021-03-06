import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { EmployeeRole } from 'src/model/employeerole.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRoleService {

  URLAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public insertEmployeeRole(role: EmployeeRole): Observable<EmployeeRole> {
    return this.http.post<EmployeeRole>(this.URLAPI + 'employeerole/', role);
  }

  public getAllRoles(): Observable<EmployeeRole[]> {
    return this.http.get<EmployeeRole[]>(this.URLAPI + 'employeerole/');
  }

  public getByIdEmployeeRole(roleID:number):Observable<EmployeeRole>{
    return this.http.get<EmployeeRole>(this.URLAPI+'employeerole/'+roleID);
  }

  public updateEmployeeRole(role:EmployeeRole):Observable<EmployeeRole>{
    return this.http.put<EmployeeRole>(this.URLAPI+'employeerole/',role);
  }

  
  public deleteEmployeeRole(roleid:number):Observable<EmployeeRole>{
    return this.http.delete<EmployeeRole>(this.URLAPI+'employeerole/'+roleid);
  }
}
