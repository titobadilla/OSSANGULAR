import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { DeviceState } from 'src/model/devicestate.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceStateService {

  URLAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public insertDeviceState(deviceState:DeviceState): Observable<DeviceState> {
    return this.http.post<DeviceState>(this.URLAPI + 'devicestate/', deviceState);
  }

  public getAllDevicestates(): Observable<DeviceState[]> {
    return this.http.get<DeviceState[]>(this.URLAPI + 'devicestate/');
  }

  public getByIdDeviceState(deviceStateID:number):Observable<DeviceState>{
    return this.http.get<DeviceState>(this.URLAPI+'devicestate/'+deviceStateID);
  }

  public updateDeviceState(deviceState:DeviceState):Observable<DeviceState>{
    return this.http.put<DeviceState>(this.URLAPI+'devicestate/',deviceState);
  }

  public deleteDeviceState(deviceStateID:number):Observable<DeviceState>{
    return this.http.delete<DeviceState>(this.URLAPI+'devicestate/'+deviceStateID);
  }
}
