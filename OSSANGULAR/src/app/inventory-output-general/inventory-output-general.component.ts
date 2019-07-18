import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Material } from 'src/model/material.model';
import { MaterialService } from 'src/app/material/material.service';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Device } from 'src/model/device.model';
import { Tool } from 'src/model/tool.model';
import { DeviceService } from 'src/app/device/device.service';
import { ToolService } from 'src/app/tool/tool.service';

@Component({
  selector: 'inventory-output-general',
  templateUrl: './inventory-output-general.component.html',
  styleUrls: ['./inventory-output-general.component.css']
})
export class InventoryOutputGeneralComponent implements OnInit, AfterViewInit {

  ngAfterViewInit() {

  }

  material: Material = new Material();
  device: Device = new Device();
  tool: Tool = new Tool();

  //variables for control of dropdown
  elements: any;
  value: String;
  public fields: Object = { text: 'name', value: 'id' };
  public watermark: string = 'Seleccione un elemento*';
  reactForm: FormGroup;

  //global variables for component
  newQuantity: number = 0;

  //boolean
  quantitySection: boolean = false;
  materialSelected: boolean = false;
  toolSelected: boolean = false;
  deviceSelected: boolean = false;

  constructor(private materialService: MaterialService,
    private deviceService: DeviceService,
    private toolService: ToolService) {
    this.createReactiveForm();
    this.associateValues();
  }

  associateValues() {
    this.material.id = this.element.value
  }

  ngOnInit() {
    this.initEventSubmit();
  }
  createReactiveForm() {
    this.reactForm = new FormGroup({
      'element': new FormControl('', [this.elementRequired]),
      'newQuantity': new FormControl('', [FormValidators.required]),
      'description': new FormControl('', ),
      'quantity': new FormControl('',)
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
         this.updateQuantity();
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
  get quantityNew() { return this.reactForm.get('newQuantity'); }
  get description() { return this.reactForm.get('description'); }
  get quantity() { return this.reactForm.get('quantity'); }

  findElementByIdGroup(id: number): any {
    let elementReturn;
    this.elements.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  movebuttonsMaterial() {
    this.value = 'material';
    this.quantitySection = false;
    this.materialService.getAllMaterial().subscribe(data => {
      this.elements = data;
    })

    this.material.id = this.element.value; //associate values
    this.material.quantity = this.quantityNew.value;
  }


  movebuttonsDevice() {
    this.value = 'device';
    this.quantitySection = false;
    this.deviceService.getAllDevice().subscribe(data => {
      this.elements = data;
    })

    this.device.id = this.element.value
    this.device.quantity = this.quantityNew.value
  }

  movebuttonsTool() {
    this.value = 'tool';
    this.quantitySection = false;
    this.toolService.getAllTool().subscribe(data => {
      this.elements = data;
    })

    this.tool.id = this.element.value
    this.tool.quantity = this.quantityNew.value
  }

  onChangeDdl(value: any) {
    if (value.itemData != undefined) {
      if (this.value === 'material') {
        this.materialSelected = true;
        this.toolSelected = false;
        this.deviceSelected = false;
        this.material = this.findElementByIdGroup(value.itemData.id);
        this.quantitySection = true;
        this.newQuantity = this.material.quantity
        this.description.setValue(this.material.description)
        this.description.disable()
        this.quantity.setValue(this.material.quantity)
        this.quantity.disable()

      }
      if (this.value === 'device') {
        this.deviceSelected = true;
        this.materialSelected = false;
        this.toolSelected = false;

        this.device = this.findElementByIdGroup(value.itemData.id);
        this.quantitySection = true;
        this.description.setValue(this.device.description)
        this.description.disable()
        this.quantity.setValue(this.device.quantity)
        this.quantity.disable()
        this.newQuantity = this.device.quantity
      }
      if (this.value === 'tool') {
        this.toolSelected = true;
        this.deviceSelected = false;
        this.materialSelected = false;

        this.tool = this.findElementByIdGroup(value.itemData.id);
        this.quantitySection = true;
        this.description.setValue(this.tool.description)
        this.description.disable()
        this.quantity.setValue(this.tool.quantity)
        this.quantity.disable()
        this.newQuantity = this.tool.quantity
      }
    }
  }


  updateQuantity() {
    if (this.toolSelected == true) {
      this.tool.quantity = this.quantityNew.value
      this.toolService.updateQuantityTool(this.tool).subscribe();
    } else if (this.materialSelected == true) {
      this.material.quantity  = this.quantityNew.value
      this.materialService.updateQuantityOfMaterial(this.material).subscribe();
    } else if (this.deviceSelected == true) {
      this.device.quantity  = this.quantityNew.value
      this.deviceService.updateQuantityDevice(this.device).subscribe();
    }
  }


}
