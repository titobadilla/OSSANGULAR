import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EmployeeComponent } from '../employee/employee.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { viewParentEl } from '@angular/core/src/view/util';
import { DeleteEmitterService } from './delete.emitter.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  title;
  data;
  type;

  deleteSection = false;
  seeMoreSection = false;
  workOrderValidateQuantitySection = false;
  constructor(public modalRef: BsModalRef, private deleteService: DeleteEmitterService
  ) { }

  ngOnInit() {
    if (this.type === 'seeMore') {
      this.seeMoreSection = true;
    }
    if (this.type === 'quantityValidate') {
      this.workOrderValidateQuantitySection = true;
    }
    else {
      this.deleteSection = true;
    }
  }

  acceptDelete() {
    if (this.type === 'employee') {
      this.deleteService.setDeleteEmployee(true);
      this.modalRef.hide();
    }

    if (this.type === 'role') {
      this.deleteService.setDeleteEmployeeRole(true);
      this.modalRef.hide();
    }
    if (this.type === 'seeMore') {
      this.modalRef.hide();
    }

    if (this.type === 'groupClient') {
      this.deleteService.setDeleteGroupClient(true);
      this.modalRef.hide();
    }

    if (this.type === 'inventoryCategory') {
      this.deleteService.setDeleteInventoryCategory(true);
      this.modalRef.hide();
    }
    if (this.type === 'measurementUnit') {
      this.deleteService.setDeleteMeasurementUnit(true);
      this.modalRef.hide();
    }
    if (this.type === 'tool') {
      this.deleteService.setDeleteTool(true);
      this.modalRef.hide();
    }
    if (this.type === 'deviceState') {
      this.deleteService.setDeleteDeviceState(true);
      this.modalRef.hide();
    }
    if (this.type === 'brand') {
      this.deleteService.setDeleteBrand(true);
      this.modalRef.hide();
    }
    if (this.type === 'model') {
      this.deleteService.setDeleteModel(true);
      this.modalRef.hide();
    }

    if (this.type === 'material') {
      this.deleteService.setDeleteMaterial(true);
      this.modalRef.hide();
    }

    if (this.type === 'quantityValidate') {
      this.modalRef.hide();
    }

    if (this.type === 'materialOfWorkOrder') {
      this.deleteService.setDeleteMaterialOfWorkOrder(true);
      this.modalRef.hide();
    }
    if (this.type === 'toolOfWorkOrder') {
      this.deleteService.setDeleteToolOfWorkOrder(true);
      this.modalRef.hide();
    }

    if (this.type === 'deviceOfWorkOrder') {
      this.deleteService.setDeleteDeviceOfWorkOrder(true);
      this.modalRef.hide();
    }
    if (this.type === 'workOrderDetail') {
      this.deleteService.setDeleteWorkOrderDetail(true);
      this.modalRef.hide();
    }
  }

  cancelDelete() {
    this.modalRef.hide();
  }

}
