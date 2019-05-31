import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkOrderDetail } from 'src/model/workOrderDetail.model';
import { WorkOrder } from 'src/model/workOrder.model';
import { WorkOrderService } from 'src/app/work-order/work-order.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { WorkOrderDetailService } from '../work-order-detail.service';
import { DeleteEmitterService } from 'src/app/delete/delete.emitter.service';
import { DeleteComponent } from 'src/app/delete/delete.component';

@Component({
  selector: 'see-work-order-detail',
  templateUrl: './see-work-order-detail.component.html',
  styleUrls: ['./see-work-order-detail.component.css']
})
export class SeeWorkOrderDetailComponent implements OnInit {

  workOrder: WorkOrder = new WorkOrder();
  detail: WorkOrderDetail;
  detailid: number;
  principal: boolean = true;
  update: boolean = false;
  detailDelete: WorkOrderDetail = new WorkOrderDetail();
  modalRef: BsModalRef;

  constructor(private workOrderDetailService: WorkOrderDetailService,
    private workOrderService: WorkOrderService,
    private modalService: BsModalService
    , private deleteService: DeleteEmitterService) {
    this.detail = new WorkOrderDetail();
  }

  ngOnInit() {
    this.workOrderService.getByIdWorkOrder(3).subscribe(data => {
      this.workOrder = data;
    });

    this.workOrderDetailService.getByIdWorkOrderDetail(1004).subscribe(data => {
      this.detail = data;
      this.splitDatesHours(this.detail);
    });

    this.deleteService.deleteWorkOrderDetail$.subscribe(data => {
      this.acceptDelete(this.detailDelete.id);
    });

  }

  acceptDelete(detailid: number) {
    this.workOrderDetailService.deleteWorkOrderDetail(detailid).subscribe(data => {
      //falta regresar al calendario
    });

  }

  private createWorkOrderDetail() {
    this.workOrderDetailService.insertWorkOrderDetail(this.detail).subscribe();
  }

  private splitDatesHours(data: WorkOrderDetail) {
    let date = data.date.split("T");
    let checkIn = data.checkIn.split(".");
    let checkOut = data.checkOut.split(".");
    this.detail.date = date[0];
    this.detail.checkIn = checkIn[0];
    this.detail.checkOut = checkOut[0];
  }

  edit() {
    this.detailid = this.detail.id;
    this.principal = false;
    this.update = true;
  }

  openModal() {
    this.detailDelete = this.detail;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar Detalle de Orden',
        data: 'el detalle de la factura: ' + this.detail.invoiceId,
        type: 'workOrderDetail'
      }
    });
  }

}
