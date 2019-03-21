import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Brand } from 'src/model/brand.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  URLAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public insertBrand(brand:Brand): Observable<Brand> {
    return this.http.post<Brand>(this.URLAPI + 'brand/', brand);
  }

  public getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.URLAPI + 'brand/');
  }

  public getByIdBrand(brandID:number):Observable<Brand>{
    return this.http.get<Brand>(this.URLAPI+'brand/'+brandID);
  }

  public updateBrand(brand:Brand):Observable<Brand>{
    return this.http.put<Brand>(this.URLAPI+'brand/',brand);
  }

  
  public deleteBrand(brandID:number):Observable<Brand>{
    return this.http.delete<Brand>(this.URLAPI+'brand/'+brandID);
  }
}
