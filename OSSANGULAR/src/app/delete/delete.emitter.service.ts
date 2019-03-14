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

  private _messageInventoryCategoryDelete = new Subject<boolean>();
  deleteInventoryCategory$ = this._messageInventoryCategoryDelete.asObservable();

  private _messageMeasurementUnitDelete = new Subject<boolean>();
  deleteMeasurementUnit$ = this._messageMeasurementUnitDelete.asObservable();

  private _messageToolDelete = new Subject<boolean>();
  deleteTool$ = this._messageToolDelete.asObservable();

  private _messageDeviceStateDelete = new Subject<boolean>();
  deleteDeviceState$ = this._messageDeviceStateDelete.asObservable();

  private _messageBrandDelete = new Subject<boolean>();
  deleteBrand$ = this._messageBrandDelete.asObservable();

  private _messageModelDelete = new Subject<boolean>();
  deleteModel$ = this._messageModelDelete.asObservable();

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

  public setDeleteInventoryCategory(flat: boolean) {
    this._messageInventoryCategoryDelete.next(flat);
  }

  public setDeleteMeasurementUnit(flat: boolean) {
    this._messageMeasurementUnitDelete.next(flat);
  }

  public setDeleteTool(flat: boolean) {
    this._messageToolDelete.next(flat);
  }

  public setDeleteDeviceState(flat: boolean) {
    this._messageDeviceStateDelete.next(flat);
  }

  public setDeleteBrand(flat: boolean) {
    this._messageBrandDelete.next(flat);
  }
  public setDeleteModel(flat: boolean) {
    this._messageModelDelete.next(flat);
  }
}
