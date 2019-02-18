import { Component, OnInit, Input } from '@angular/core';
import { WorkOrderDetailService } from '../work-order-detail.service';
import { WorkOrderDetail } from 'src/model/workorderdetail.model';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'update-work-order-detail',
  templateUrl: './update-work-order-detail.component.html',
  styleUrls: ['./update-work-order-detail.component.css']
})
export class UpdateWorkOrderDetailComponent implements OnInit {

  @Input() detailid: number;
  detail: WorkOrderDetail;
  reactForm: FormGroup;

  constructor(private detailService: WorkOrderDetailService) {
    this.detail = new WorkOrderDetail();
    this.createReactiveForm();
    this.associateValues();
   }

  ngOnInit() {
    this.detailService.getByIdWorkOrderDetail(this.detailid).subscribe(data => {
      this.detail = data;
      this.splitDatesHours(this.detail);
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


  private splitDatesHours(data: WorkOrderDetail) {
    let date = data.date.split("T");
    let checkIn = data.checkIn.split(".");
    let checkOut = data.checkOut.split(".");
    this.detail.date = date[0];
    this.detail.checkIn = checkIn[0];
    this.detail.checkOut = checkOut[0];
  }
}
