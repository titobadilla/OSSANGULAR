import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressDescription } from 'src/model/addressdescription.model';

@Injectable({
  providedIn: 'root'
})
export class AddressDescriptionService {

  URLAPI=environment.apiUrl;


  constructor(private http: HttpClient) { }

  public getAllAddressDescriptions(): Observable<AddressDescription[]> {
    return this.http.get<AddressDescription[]>(this.URLAPI+'addressdescription/');
  }

  public insertAddressDescription(addressdescription: AddressDescription):Observable<AddressDescription> {
    return this.http.post<AddressDescription>(this.URLAPI+'addressdescription/',addressdescription);
  }

  public updateAddressDescription(addressdescription: AddressDescription):Observable<AddressDescription> {
    return this.http.put<AddressDescription>(this.URLAPI+'addressdescription/',addressdescription);
  }

  public deleteAddressDescription(addressDescriptionId: string) {
    return this.http.delete<AddressDescription>(this.URLAPI+'addressdescription/'+addressDescriptionId);
  }

  public getByIdAddressDescription(addressDescriptionId: String) {
        return this.http.get<AddressDescription>(this.URLAPI+'addressdescription/'+addressDescriptionId);
  }

}