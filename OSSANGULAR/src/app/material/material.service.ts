
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from 'src/model/material.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  URLAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public insertMaterial(material:Material): Observable<Material> {
    return this.http.post<Material>(this.URLAPI + 'material/', material);
  }

  public getAllMaterial(): Observable<Material[]> {
    return this.http.get<Material[]>(this.URLAPI + 'material/');
  }

  public getByIdMaterial(materialID:number):Observable<Material>{
    return this.http.get<Material>(this.URLAPI+'material/'+materialID);
  }

  public updateMaterial(material:Material):Observable<Material>{
    return this.http.put<Material>(this.URLAPI+'material/',material);
  }

  public deleteMaterial(material:number):Observable<Material>{
    return this.http.delete<Material>(this.URLAPI+'material/'+material);
  }

  public updateQuantityOfMaterial(material:Material):Observable<Material>{
    return this.http.put<Material>(this.URLAPI+'material/updateQuantity/',material);
  }
}
