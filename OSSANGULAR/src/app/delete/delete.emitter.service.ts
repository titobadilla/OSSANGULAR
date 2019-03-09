import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteEmitterService {
  private _message1 = new Subject<boolean>();
  deleteEmployee$ = this._message1.asObservable();

  constructor() { }

  public setDeleteEmployee(flat:boolean){
    this._message1.next(flat);    
  }
}
