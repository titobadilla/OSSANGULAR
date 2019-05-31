import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { WorkOrderService } from 'src/app/work-order/work-order.service';
import { WorkOrder } from 'src/model/workOrder.model';
import { FormGroup, FormControl } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { WorkOrderMaterial } from 'src/model/workOrdermaterial.model';
import { WorkOrderDevice } from 'src/model/workOrderdevice.model';
import { WorkOrderTool } from 'src/model/workOrdertool.model';
import { InventoryOutputService } from '../inventory-output.service';

@Component({
  selector: 'inventory-output-specific',
  templateUrl: './inventory-output-specific.component.html',
  styleUrls: ['./inventory-output-specific.component.css']
})
export class InventoryOutputSpecificComponent implements OnInit, AfterViewInit {

  //data of fatherComponent
  title;
  data;

  workOrder: WorkOrder = new WorkOrder();
  workOrdermaterial: WorkOrderMaterial = new WorkOrderMaterial();
  workOrderdevice: WorkOrderDevice = new WorkOrderDevice();
  workOrdertool: WorkOrderTool = new WorkOrderTool();
  elementSelected: String;

  //booleans for control in html
  modalSection: boolean = true;
  quantitySection: boolean = false;
  updateSection: boolean = false;
  errorSection: boolean = false;
  errorSectionTwo: boolean = false;

  //variables for control of dropdown
  elements: any;
  value: String;

  //error de fields
  //public fields: Object = { text: 'id.device.name', value: 'id' };
  public fields: Object = { text: 'id.device.name', value: 'id.device.id' };



  public watermark: string = 'Seleccione un elemento*';
  reactForm: FormGroup;

  //global variables for component
  //newQuantity: number = 0;

  ngAfterViewInit(): void {
    this.element.disable();
    this.workOrderService.getByIdWorkOrder(this.data).subscribe(data => {
      this.workOrder = data;
      if (this.workOrder.listWorkOrderDevices.length == 0 && this.workOrder.listWorkOrderMaterials.length == 0 && this.workOrder.listWorkOrderTools.length == 0) {
        this.errorSectionTwo = true;
      }
    })


  }
  constructor(public modalRef: BsModalRef,
    private workOrderService: WorkOrderService,
    private inventoryOutputService: InventoryOutputService) {
    this.createReactiveForm();
  }

  ngOnInit() {
  }

  movebuttonsMaterial() {

    if (this.workOrder.listWorkOrderMaterials.length == 0) {
      this.errorSection = true;
    } else {
      this.errorSection = false;
      this.value = 'material';
      this.quantitySection = false;
      this.element.enable();

      //fill the list with materials of work order
      this.elements = this.workOrder.listWorkOrderMaterials

      this.workOrdermaterial.id.material.id = this.element.value; //associate values
      this.workOrdermaterial.quantity = this.quantityNew.value;
      this.updateSection = true;
      if (this.updateSection) {
        this.initEventSubmit();
      }

    }
  }

  movebuttonsDevice() {

    if (this.workOrder.listWorkOrderDevices.length == 0) {
      this.errorSection = true;
    } else {
      this.errorSection = false;
      this.value = 'device';
      this.quantitySection = false;
      this.element.enable();

      //fill the list with devices of work order
      this.elements = this.workOrder.listWorkOrderDevices

      this.workOrderdevice.id.device.id = this.element.value
      this.workOrderdevice.quantity = this.quantityNew.value
      this.updateSection = true;
      if (this.updateSection) {
        this.initEventSubmit();
      }
    }
  }

  movebuttonsTool() {
    if (this.workOrder.listWorkOrderTools.length == 0) {

      /************************ *que solo sea true por unos segundos/*/
      this.errorSection = true;
    } else {
      this.errorSection = false;
      this.value = 'tool';
      this.quantitySection = false;
      this.element.enable();

      //fill the list with devices of work order
      this.elements = this.workOrder.listWorkOrderTools

      this.workOrdertool.id.tool.id = this.element.value
      this.workOrdertool.quantity = this.quantityNew.value
      this.updateSection = true;
      if (this.updateSection) {
        this.initEventSubmit();
      }
    }
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'element': new FormControl('', []),
      'quantityNew': new FormControl('', [FormValidators.required]),
      'description': new FormControl('', []),
      'quantity': new FormControl('', [])
    });
  }

  elementRequired(control: FormControl) {
    let value = control.value;
    if ((value === null || value === "" || value === undefined)) {
      return {
        errorD: {
          parsed: value
        }
      }
    }
    return null;
  }

  initEventSubmit() {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();

        if (this.value === 'material') {
          // this.inventoryOutputService.updateQuantityMaterial(this.workOrdermaterial.id.material);
        }
        if (this.value === 'tool') {
          // this.inventoryOutputService.updateQuantityTool(this.workOrdertool.id.tool);
        }
        if (this.value === 'device') {
          this.workOrderdevice.quantity = this.quantityNew.value;
          console.log(this.workOrderdevice.quantity)

          //no lo manda al api
          this.inventoryOutputService.updateQuantityDevice(this.workOrderdevice.id.device);
        }

        // validating whole form
        Object.keys(this.reactForm.controls).forEach(field => {
          const control = this.reactForm.get(field);
          control.markAsTouched({ onlySelf: true });
        });
      });
  }

  get element() { return this.reactForm.get('element'); }
  get quantityNew() { return this.reactForm.get('quantityNew') }
  get description() { return this.reactForm.get('description') }
  get quantity() { return this.reactForm.get('quantity') }

  onChangeDdl(value: any) {
    if (value.itemData != undefined) {
      if (this.value === 'material') {
        this.workOrdermaterial = this.findMaterialById(value.itemData.id.material.id);
        this.quantitySection = true;
        this.description.setValue(this.workOrdermaterial.id.material.description)
        this.description.disable()
        this.quantity.setValue(this.workOrdermaterial.id.material.quantity)
        this.quantity.disable()
        this.quantityNew.setValue(this.workOrdermaterial.quantity)
        this.quantityNew.setValidators(FormValidators.required);

      }
      if (this.value === 'device') {
        this.workOrderdevice = this.findDeviceById(value.itemData.id.device.id);
        this.quantitySection = true;
        this.description.setValue(this.workOrderdevice.id.device.description);
        this.description.disable()
        this.quantity.setValue(this.workOrderdevice.id.device.quantity)
        this.quantity.disable();
        this.quantityNew.setValue(this.workOrderdevice.quantity)
        this.quantityNew.setValidators(FormValidators.required);
      }
      if (this.value === 'tool') {
        this.workOrdertool = this.findToolById(value.itemData.id.tool.id);
        this.quantitySection = true;
        this.description.setValue(this.workOrdertool.id.tool.description)
        this.description.disable()
        this.quantity.setValue(this.workOrdertool.id.tool.quantity)
        this.quantity.disable();
        this.quantityNew.setValue(this.workOrdertool.quantity)
        this.quantityNew.setValidators(FormValidators.required);
      }
    }
  }

  findDeviceById(id: number): any {
    let elementReturn;
    this.elements.forEach(element => {
      if (element.id.device.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  findToolById(id: number): any {
    let elementReturn;
    this.elements.forEach(element => {
      if (element.id.tool.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  findMaterialById(id: number): any {
    let elementReturn;
    this.elements.forEach(element => {
      if (element.id.material.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }
}
