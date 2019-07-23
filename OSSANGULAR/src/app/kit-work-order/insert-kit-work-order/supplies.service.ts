import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { SuppliesDevice } from 'src/model/suppliesDevice.model';
import { Observable } from 'rxjs';
import { SuppliesTool } from 'src/model/suppliesTool.model';
import { SuppliesMaterial } from 'src/model/suppliesMaterial.model';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService{

  URLAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public insertSuppliesDevice(suppliesDevice: SuppliesDevice): Observable<SuppliesDevice> {
    return this.http.post<SuppliesDevice>(this.URLAPI + 'suppliesdevice/', suppliesDevice);
  }

  public insertSuppliesTool(suppliesTool: SuppliesTool): Observable<SuppliesTool> {
    return this.http.post<SuppliesTool>(this.URLAPI + 'suppliestool/', suppliesTool);
  }

  public insertSuppliesMaterial(suppliesMaterial: SuppliesMaterial): Observable<SuppliesMaterial> {
    return this.http.post<SuppliesMaterial>(this.URLAPI + 'suppliesmaterial/', suppliesMaterial);
  }
  
}
