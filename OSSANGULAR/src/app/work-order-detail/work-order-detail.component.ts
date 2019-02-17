import { Component, OnInit } from '@angular/core';
import { WorkOrderDetailService } from './work-order-detail.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { WorkOrderDetail } from 'src/model/workorderdetail.model';
import { WorkOrderService } from '../work-order/work-order.service';
import { WorkOrder } from 'src/model/workorder.model';

@Component({
  selector: 'work-order-detail',
  templateUrl: './work-order-detail.component.html',
  styleUrls: ['./work-order-detail.component.css']
})
export class WorkOrderDetailComponent implements OnInit {

  workOrder:WorkOrder = new WorkOrder();
  checked: boolean = true;

  constructor(private router: Router,private workOrderDetail:WorkOrderDetailService, private workOrderService:WorkOrderService) {
    this.createReactiveForm();
    this.associateValues();
   }

  reactForm: FormGroup;
  detail: WorkOrderDetail = new WorkOrderDetail();

  ngOnInit() {
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

      this.workOrderService.getByIdWorkOrder(3).subscribe(data=>{
        this.workOrder=data;
      });
      }
  
  associateValues() {
  // this.detail.date = this.date.value;
  // this.detail.checkIn = this.checkIn.value;
  // this.detail.checkOut = this.checkOut.value;
  // this.detail.description = this.description.value;
  // this.detail.invoiceId = this.invoiceId.value;
  // this.detail.managerName = this.managerName.value;
  
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'date': new FormControl('', [FormValidators.required]),
      'checkIn': new FormControl('', [FormValidators.date]),
      'checkOut':new FormControl('', [FormValidators.date]),
      'description': new FormControl('', [FormValidators.required]),
      'invoiceId': new FormControl('', [FormValidators.number]),
      'managerName': new FormControl('', [FormValidators.required]),
    });

  }

  get date() { return this.reactForm.get('date'); }
  get checkIn() { return this.reactForm.get('checkIn'); }
  get checkOut() { return this.reactForm.get('checkOu'); }
  get description() { return this.reactForm.get('description'); }
  get invoiceId() { return this.reactForm.get('invoiceId'); }
  get managerName() { return this.reactForm.get('managerName'); }

  private createWorkOrderDetail() {
  
  }
}
