import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuAnimationSettingsModel } from '@syncfusion/ej2-navigations';
import { Model } from 'src/model/model.model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  URLAPI=environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllModels(): Observable<Model[]> {
    return this.http.get<Model[]>(this.URLAPI+'model/');
  }

  
  public insertModel(model:Model):Observable<Model>{
      return this.http.post<Model>(this.URLAPI+'model/', model);
  }

  public getByIdModel(id: number):Observable<Model>{
      return this.http.get<Model>(this.URLAPI+'model/'+id);
  }

  
  public updateModel(model:Model):Observable<Model>{
    return this.http.put<Model>(this.URLAPI+'model/',model);
  }

  public deleteModel(id:String):Observable<Model>{
    return this.http.delete<Model>(this.URLAPI+'model/' + id);
  }

}
