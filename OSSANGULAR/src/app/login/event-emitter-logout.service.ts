import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterLogoutService {
  private _message1 = new Subject<boolean>();
  messageSesionClosedByUser$ = this._message1.asObservable();

  private _message2 = new Subject<boolean>();
  messageSesionClosedBySystem$ = this._message2.asObservable();
  
  constructor() { }

  public setSessionClosedByUser(flat:boolean){
    this._message1.next(flat);
  }

  public setSessionClosedBySystem(flat:boolean){
    this._message2.next(flat);
  }
}
