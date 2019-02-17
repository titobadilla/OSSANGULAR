import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkOrderDetail } from 'src/model/workorderdetail.model';
import { WorkOrder } from 'src/model/workorder.model';
import { WorkOrderService } from 'src/app/work-order/work-order.service';
import { WorkOrderDetailService } from './work-order-detail.service';
import { UpdateWorkOrderDetailComponent } from './update-work-order-detail/update-work-order-detail.component';

@Component({
  selector: 'work-order-detail',
  templateUrl: './work-order-detail.component.html',
  styleUrls: ['./work-order-detail.component.css']
})
export class WorkOrderDetailComponent implements OnInit {

  workOrder: WorkOrder = new WorkOrder();
  detail: WorkOrderDetail;
  detailid: number;
  principal: boolean = true;
  modalDelete: boolean = false;
  update: boolean = false;

  @ViewChild('updateWorkOrderDetail') childOne: UpdateWorkOrderDetailComponent;

  constructor(private workOrderDetailService: WorkOrderDetailService, private workOrderService: WorkOrderService) {
    this.detail = new WorkOrderDetail();
  }

  ngOnInit() {
    this.workOrderService.getByIdWorkOrder(3).subscribe(data => {
      this.workOrder = data;
    });

    this.workOrderDetailService.getByIdWorkOrderDetail(10).subscribe(data => {
      this.detail = data;
      this.splitDatesHours(this.detail);
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
  delete() {
    this.modalDelete = true;
  }

  hideModal() {
    this.modalDelete = false;
  }

  aceptDelete() {
    this.workOrderDetailService.deleteWorkOrderDetail(this.detail.id).subscribe();
    this.modalDelete = false;
  }
}
