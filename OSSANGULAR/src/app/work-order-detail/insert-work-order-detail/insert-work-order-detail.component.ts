import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { WorkOrderDetail } from 'src/model/workorderdetail.model';
import { WorkOrder } from 'src/model/workorder.model';
import { WorkOrderDetailService } from '../work-order-detail.service';
import { WorkOrderService } from 'src/app/work-order/work-order.service';

@Component({
  selector: 'app-insert-work-order-detail',
  templateUrl: './insert-work-order-detail.component.html',
  styleUrls: ['./insert-work-order-detail.component.css']
})
export class InsertWorkOrderDetailComponent implements OnInit {
  
  workOrder: WorkOrder = new WorkOrder();
  reactForm: FormGroup;
  detail: WorkOrderDetail;

  constructor( private workOrderDetailService: WorkOrderDetailService, private workOrderService: WorkOrderService) {
    this.detail = new WorkOrderDetail();
    this.createReactiveForm();
    this.associateValues();
  }

  ngOnInit() {
    this.workOrderService.getByIdWorkOrder(3).subscribe(data => {
      this.workOrder = data;
    });

    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          this.reactForm.reset();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });
  }

  associateValues() {
    this.detail.date = this.date.value;
    this.detail.checkIn = this.checkIn.value;
    this.detail.checkOut = this.checkOut.value;
    this.detail.description = this.description.value;
    this.detail.invoiceId = this.invoiceId.value;
    this.detail.managerName = this.managerName.value;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'date': new FormControl('', [FormValidators.required]),
      'checkIn': new FormControl('', [FormValidators.date]),
      'checkOut': new FormControl('', [FormValidators.date]),
      'description': new FormControl('', [FormValidators.required]),
      'invoiceId': new FormControl('', [FormValidators.required]),
      'managerName': new FormControl('', [FormValidators.required]),
    });
  }

  get date() { return this.reactForm.get('date'); }
  get checkIn() { return this.reactForm.get('checkIn'); }
  get checkOut() { return this.reactForm.get('checkOut'); }
  get description() { return this.reactForm.get('description'); }
  get invoiceId() { return this.reactForm.get('invoiceId'); }
  get managerName() { return this.reactForm.get('managerName'); }

  private createWorkOrderDetail() {
    this.workOrderDetailService.insertWorkOrderDetail(this.detail).subscribe();
    this.reactForm.reset();
  }
}
