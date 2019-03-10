import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteEmitterService {
  private _messageEmployeeDelete = new Subject<boolean>();
  deleteEmployee$ = this._messageEmployeeDelete.asObservable();

  private _messageEmployeeRoleDelete = new Subject<boolean>();
  deleteEmployeeRole$ = this._messageEmployeeRoleDelete.asObservable();

  constructor() { }

  public setDeleteEmployee(flat: boolean) {
    this._messageEmployeeDelete.next(flat);
  }

  public setDeleteEmployeeRole(flat: boolean) {
    this._messageEmployeeRoleDelete.next(flat);
  }
}
