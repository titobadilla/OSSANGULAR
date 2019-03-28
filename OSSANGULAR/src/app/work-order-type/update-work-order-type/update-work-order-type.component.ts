import { Component, OnInit, Input } from '@angular/core';
import { WorkOrderType } from 'src/model/workordertype.model';
import { WorkOrderTypeService } from '../work-order-type.service';
import { WorkOrderTypeComponent } from '../work-order-type.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'update-work-order-type',
  templateUrl: './update-work-order-type.component.html',
  styleUrls: ['./update-work-order-type.component.css']
})
export class UpdateWorkOrderTypeComponent implements OnInit {

  @Input() typeId: number;

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
          this.editWorkOrderType();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });

    this.typeService.getByIdWorkOrderType(this.typeId).subscribe(data => {
      this.type = data;
    })
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

  private editWorkOrderType() {
    this.typeService.updateWorkOrderType(this.type).subscribe(
      data => {
        this.returnView();
      }
    );

  }

  returnView() {
    this.parent.getAllTypes();
    this.parent.editSection = false;
    this.parent.principal = true;
  }

}
