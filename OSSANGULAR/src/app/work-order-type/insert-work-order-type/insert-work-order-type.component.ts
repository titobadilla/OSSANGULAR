import { Component, OnInit } from '@angular/core';
import { WorkOrderType } from 'src/model/workordertype.model';
import { WorkOrderTypeService } from '../work-order-type.service';
import { WorkOrderTypeComponent } from '../work-order-type.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'insert-work-order-type',
  templateUrl: './insert-work-order-type.component.html',
  styleUrls: ['./insert-work-order-type.component.css']
})
export class InsertWorkOrderTypeComponent implements OnInit {

  reactForm: FormGroup;
  type: WorkOrderType = new WorkOrderType();


  constructor(private typeService: WorkOrderTypeService, private parent: WorkOrderTypeComponent) {
    this.createReactiveForm();
    this.associateValues();
  }

  ngOnInit() {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          this.createWorkOrderType();
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
    this.type.name = this.name.value;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
    });

  }

  get name() { return this.reactForm.get('name'); }

  private createWorkOrderType() {
    this.typeService.insertWorkOrderType(this.type).subscribe(data=>{
      this.returnView();
    });
  }

  returnView() {
    this.parent.getAllTypes();
    this.parent.insertSection = false;
    this.parent.principal = true;
  }

}
