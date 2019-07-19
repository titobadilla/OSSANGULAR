import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Tool } from 'src/model/tool.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  URLAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public insertTool(tool:Tool): Observable<Tool> {
    return this.http.post<Tool>(this.URLAPI + 'tool/', tool);
  }

  public getAllTool(): Observable<Tool[]> {
    return this.http.get<Tool[]>(this.URLAPI + 'tool/');
  }

  public getByIdTool(toolID:number):Observable<Tool>{
    return this.http.get<Tool>(this.URLAPI+'tool/'+toolID);
  }

  public updateTool(tool:Tool):Observable<Tool>{
    return this.http.put<Tool>(this.URLAPI+'tool/',tool);
  }

  public deleteTool(tool:number):Observable<Tool>{
    return this.http.delete<Tool>(this.URLAPI+'tool/'+tool);
  }

  public updateQuantityTool(tool:Tool): Observable<Tool>{
    return this.http.put<Tool>(this.URLAPI+'tool/updateQuantity/',tool);
  }
}
