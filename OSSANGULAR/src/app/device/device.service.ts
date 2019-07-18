
import { Device } from 'src/model/device.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  URLAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public insertDevice(device:Device): Observable<Device> {
    return this.http.post<Device>(this.URLAPI + 'device/', device);
  }

  public getAllDevice(): Observable<Device[]> {
    return this.http.get<Device[]>(this.URLAPI + 'device/');
  }

  public getByIdDevice(deviceID:number):Observable<Device>{
    return this.http.get<Device>(this.URLAPI+'device/'+deviceID);
  }

  public updateDevice(device:Device):Observable<Device>{
    return this.http.put<Device>(this.URLAPI+'device/',device);
  }

  public deleteDevice(device:number):Observable<Device>{
    return this.http.delete<Device>(this.URLAPI+'device/'+device);
  }
  public updateQuantityDevice(device:Device): Observable<Device>{
    return this.http.put<Device>(this.URLAPI+'device/updateQuantity/',device);
  }
}
