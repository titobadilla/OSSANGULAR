import { Component, OnInit } from '@angular/core';
import { WorkOrderDetailService } from './work-order-detail.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { WorkOrderDetail } from 'src/model/workorderdetail.model';

@Component({
  selector: 'work-order-detail',
  templateUrl: './work-order-detail.component.html',
  styleUrls: ['./work-order-detail.component.css']
})
export class WorkOrderDetailComponent implements OnInit {

  constructor(private router: Router,private workOrderDetail:WorkOrderDetailService) {
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
  }

  associateValues() {
    //this.detail.
  
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
      'type': new FormControl('', [FormValidators.required]),
    });

  }

  get name() { return this.reactForm.get('name'); }
  get type() { return this.reactForm.get('type'); }

  private createEmployeeRole() {
  
  }
}
