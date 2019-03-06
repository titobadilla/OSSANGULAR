import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { WorkOrderService } from 'src/app/work-order/work-order.service';
import { WorkOrder } from 'src/model/workorder.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Material } from 'src/model/material.model';
import { MaterialService } from 'src/app/material/material.service';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Device } from 'src/model/device.model';
import { Tool } from 'src/model/tool.model';
import { DeviceService } from 'src/app/device/device.service';
import { ToolService } from 'src/app/tool/tool.service';
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
  material: Material = new Material();
  device: Device = new Device();
  tool: Tool = new Tool();

  //booleans for control in html
  modalSection: boolean = false;
  buttonSection1: boolean = true;
  buttonSection2: boolean = false;
  quantitySection: boolean = false;
  updateSection: boolean = false;

  //variables for control of dropdown
  elements: any;
  value: String;
  public fields: Object = { text: 'name', value: 'id' };
  public watermark: string = 'Seleccione un elemento*';
  reactForm: FormGroup;

  //global variables for component
  newQuantity: number = 0;
  descriptionElement: String;
  quantityElement: number;

  ngAfterViewInit(): void {
    // this.workOrderService.getByIdWorkOrder(this.data).subscribe(data=>{
    //  this.workOrder= data;
    this.modalSection = true;
    this.updateSection = true;

    // })
  }
  constructor(public modalRef: BsModalRef,
    private workOrderService: WorkOrderService,
    private materialService: MaterialService,
    private deviceService: DeviceService,
    private toolService: ToolService) {
    this.createReactiveForm();
  }

  ngOnInit() {
  }


  movebuttonsMaterial() {
    this.value = 'material';
    this.quantitySection = false;
    this.materialService.getAllMaterial().subscribe(data => {
      this.elements = data;
    })

    this.material.id = this.element.value; //associate values
    this.material.quantity = this.quantityNew.value;

    if (this.buttonSection1) {
      this.buttonSection1 = false;
      this.buttonSection2 = true;
      this.updateSection = true;
      if (this.updateSection) {
        this.initEventSubmit();
      }
    }
  }


  movebuttonsDevice() {
    this.value = 'device';
    this.quantitySection = false;
    this.deviceService.getAllDevice().subscribe(data => {
      this.elements = data;
    })

    this.device.id = this.element.value
    this.device.quantity = this.quantityNew.value

    if( this.buttonSection1){
      this.buttonSection1 = false;
      this.buttonSection2 = true;
      this.updateSection = true;
      if (this.updateSection) {
        this.initEventSubmit();
      }
    }
  }

  movebuttonsTool() {
    this.value = 'tool';
    this.quantitySection = false;
    this.toolService.getAllTool().subscribe(data => {
      this.elements = data;
    })

    this.tool.id = this.element.value
    this.tool.quantity = this.quantityNew.value

    if( this.buttonSection1){
      this.buttonSection1 = false;
      this.buttonSection2 = true;
      this.updateSection = true;
      if (this.updateSection) {
        this.initEventSubmit();
      }
    }
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'element': new FormControl('', [this.elementRequired]),
      'newQuantity': new FormControl('', [FormValidators.required]),
      'description': new FormControl('', [FormValidators.required]),
      'quantity': new FormControl('', [FormValidators.required])
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
        if (this.reactForm.valid) {
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });
  }
  get element() { return this.reactForm.get('element'); }
  get quantityNew() { return this.reactForm.get('newQuantity') }
  get description() { return this.reactForm.get('description') }
  get quantity() { return this.reactForm.get('quantity') }

  onChangeDdl(value: any) {
    if (value.itemData != undefined) {
      if (this.value === 'material') {

        this.material = this.findElementByIdGroup(value.itemData.id);
        this.quantitySection = true;
        this.descriptionElement = this.material.description
        this.quantityElement = this.material.quantity
        this.newQuantity = this.material.quantity

      }
      if (this.value === 'device') {
        this.device = this.findElementByIdGroup(value.itemData.id);
        this.quantitySection = true;
        this.descriptionElement = this.device.description
        this.quantityElement = this.device.quantity
        this.newQuantity = this.device.quantity
      }
      if (this.value === 'tool') {
        this.tool = this.findElementByIdGroup(value.itemData.id);
        this.quantitySection = true;
        this.descriptionElement = this.tool.description
        this.quantityElement = this.tool.quantity
        this.newQuantity = this.tool.quantity
      }
    }
  }

  findElementByIdGroup(id: number): any {
    let elementReturn;
    this.elements.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }
}
