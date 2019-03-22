import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KitWorkOrder } from 'src/model/kitWorkOrder.model';
import { WorkOrder } from 'src/model/workorder.model';
import { Tool } from 'src/model/tool.model';
import { setCulture } from '@syncfusion/ej2-base';

@Component({
  selector: 'insert-inventory-work-order',
  templateUrl: './insert-inventory-work-order.component.html',
  styleUrls: ['./insert-inventory-work-order.component.css']
})
export class InsertInventoryWorkOrderComponent implements OnInit {

  reactForm: FormGroup;
  //workOrder: WorkOrder = new WorkOrder();
  public tools: Tool[];
  public pageSettings: Object;

  kitsWorkOrder: KitWorkOrder[];
  public kitWorkOrder: Object = { text: 'name', value: 'id' };
  public kitWatermark: string = 'Seleccione una lista*';

  constructor( ) {     this.createReactiveForm();
   // this.associateValues();
  }

  ngOnInit() {
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');

    this.initEventSubmit();
  }

  initEventSubmit() {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          //  this.createWorkOrder();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'kit': new FormControl('', []),
    });
  }

  get kit() { return this.reactForm.get('kit'); }
}
