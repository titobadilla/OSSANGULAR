import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from 'src/model/material.model';
import { Tool } from 'src/model/tool.model';
import { Device } from 'src/model/device.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryOutputService {

  URLAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public updateQuantityMaterial(material:Material): Observable<Material>{
    return this.http.put<Material>(this.URLAPI+'material/updateQuantity/',material);
  }

  public updateQuantityTool(tool:Tool): Observable<Tool>{
    return this.http.put<Tool>(this.URLAPI+'tool/updateQuantity/',tool);
  }

  public updateQuantityDevice(device:Device): Observable<Device>{
    return this.http.put<Device>(this.URLAPI+'device/updateQuantity/',device);
  }
}
