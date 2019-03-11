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

  private _messageGroupClientDelete = new Subject<boolean>();
  deleteGroupClient$ = this._messageGroupClientDelete.asObservable();

  constructor() { }

  public setDeleteEmployee(flat: boolean) {
    this._messageEmployeeDelete.next(flat);
  }

  public setDeleteEmployeeRole(flat: boolean) {
    this._messageEmployeeRoleDelete.next(flat);
  }

  public setDeleteGroupClient(flat: boolean) {
    this._messageGroupClientDelete.next(flat);
  }
}
