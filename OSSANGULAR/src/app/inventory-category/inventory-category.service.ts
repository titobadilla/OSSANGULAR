import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { InventoryCategory } from 'src/model/inventorycategory.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InventoryCategoryService {

  URLAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public insertInventoryCategory(category:InventoryCategory): Observable<InventoryCategory> {
    return this.http.post<InventoryCategory>(this.URLAPI + 'inventorycategory/', category);
  }

  public getAllCategories(): Observable<InventoryCategory[]> {
    return this.http.get<InventoryCategory[]>(this.URLAPI + 'inventorycategory/');
  }

  public getByIdInventoryCategory(categoryID:number):Observable<InventoryCategory>{
    return this.http.get<InventoryCategory>(this.URLAPI+'inventorycategory/'+categoryID);
  }

  public updateInventoryCategory(category:InventoryCategory):Observable<InventoryCategory>{
    return this.http.put<InventoryCategory>(this.URLAPI+'inventorycategory/',category);
  }

  
  public deleteInventoryCategory(categoryID:number):Observable<InventoryCategory>{
    return this.http.delete<InventoryCategory>(this.URLAPI+'inventorycategory/'+categoryID);
  }
}
