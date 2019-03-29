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

  private _sessionClosedByExpiration = new Subject<boolean>();
  _sessionClosedByExpiration$ = this._message1.asObservable();

  private _logoutByCellForm = new Subject<boolean>();
  _logoutByCellForm$ = this._logoutByCellForm.asObservable();
  
  constructor() { }

  public setLogout(flat:boolean){
    this._logoutByCellForm.next(flat);
    
  }

  public setSessionClosedByUser(flat:boolean){
    this._message1.next(flat);
    
  }

  public setSessionClosedBySystem(flat:boolean){
    this._message2.next(flat);
  }

  public setSessionClosedByExpiration(flat:boolean){
    this._sessionClosedByExpiration.next(flat);
  }
}
