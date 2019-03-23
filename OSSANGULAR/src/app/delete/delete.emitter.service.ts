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

  private _messageClientDelete = new Subject<boolean>();
  deleteClient$ = this._messageClientDelete.asObservable();

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

  private _messageMaterialDelete = new Subject<boolean>();
  deleteMaterial$ = this._messageMaterialDelete.asObservable();

  private _messageMaterialDeleteOfWorkOrder = new Subject<boolean>();
  deleteMaterialOfWorkOrder$ = this._messageMaterialDeleteOfWorkOrder.asObservable();

  private _messageToolDeleteOfWorkOrder = new Subject<boolean>();
  deleteToolOfWorkOrder$ = this._messageToolDeleteOfWorkOrder.asObservable();

  private _messageDeviceDeleteOfWorkOrder = new Subject<boolean>();
  deleteDeviceOfWorkOrder$ = this._messageDeviceDeleteOfWorkOrder.asObservable();

  private _messageWorkOrderDetailDelete= new Subject<boolean>();
  deleteWorkOrderDetail$ = this._messageWorkOrderDetailDelete.asObservable();

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

  public setDeleteClient(flat: boolean) {
    this._messageClientDelete.next(flat);
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

  public setDeleteMaterial(flat: boolean) {
    this._messageMaterialDelete.next(flat);
  }
  public setDeleteMaterialOfWorkOrder(flat: boolean) {
    this._messageMaterialDeleteOfWorkOrder.next(flat);
  }
  public setDeleteDeviceOfWorkOrder(flat: boolean) {
    this._messageDeviceDeleteOfWorkOrder.next(flat);
  }

  public setDeleteToolOfWorkOrder(flat: boolean) {
    this._messageToolDeleteOfWorkOrder.next(flat);
  }

  public setDeleteWorkOrderDetail(flat:boolean){
    this._messageWorkOrderDetailDelete.next(flat);
  }
}
