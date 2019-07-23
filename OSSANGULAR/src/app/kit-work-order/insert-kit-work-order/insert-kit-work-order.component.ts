import { Component, OnInit, ViewChild } from '@angular/core';
import { KitWorkOrder } from 'src/model/kitWorkOrder.model';
import { FormGroup, FormControl } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Material } from 'src/model/material.model';
import { Device } from 'src/model/device.model';
import { Tool } from 'src/model/tool.model';
import { KitWorkOrderService } from '../kit-work-order.service';
import { MaterialService } from 'src/app/material/material.service';
import { ToolService } from 'src/app/tool/tool.service';
import { DeviceService } from 'src/app/device/device.service';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { SuppliesDevice } from 'src/model/suppliesDevice.model';
import { SuppliesTool } from 'src/model/suppliesTool.model';
import { SuppliesMaterial } from 'src/model/suppliesMaterial.model';
import { SuppliesService } from './supplies.service';

@Component({
  selector: 'app-insert-kit-work-order',
  templateUrl: './insert-kit-work-order.component.html',
  styleUrls: ['./insert-kit-work-order.component.css']
})
export class InsertKitWorkOrderComponent implements OnInit {
  reactForm: FormGroup;
  kit: KitWorkOrder = new KitWorkOrder();
  kitCreated: KitWorkOrder = new KitWorkOrder();
  bandera: boolean = false;
  detail: boolean = false;
  implements: boolean = false;
  add: boolean = true;
  dev: boolean = false;
  to: boolean = false;
  mat: boolean = false;
  save: boolean = false;

  kitList: KitWorkOrder[] = new Array();
  selectedSuppliesDevice: SuppliesDevice[] = new Array();
  selectedSuppliesTool: SuppliesTool[] = new Array();
  selectedSuppliesMaterial: SuppliesMaterial[] = new Array();

  inventories: any[];
  public inventory: Object = { text: 'name', value: 'id' };
  public watermark: string = 'Seleccione un artículo*';

  constructor(private kitWorkOrderService: KitWorkOrderService,
    private materialService: MaterialService, private toolService: ToolService, private deviceService: DeviceService,
    private kitService: KitWorkOrderService, private suppliesService: SuppliesService) {
    this.createReactiveForm();
    this.associateValues();
  }


  ngOnInit() {
    this.kitWorkOrderService.getAllKitWorkOrder().subscribe(data => {
      this.kitList = data;
    })
  }

  fillDropdown(type: any) {

    if (type.srcElement.id == 'material') {

      this.materialService.getAllMaterial().subscribe(data => {
        this.inventories = data;
        this.to = false;
        this.dev = false;
        this.mat = true;
      });
    }

    if (type.srcElement.id == 'tool') {
      this.toolService.getAllTool().subscribe(data => {
        this.inventories = data;
        this.mat = false;
        this.dev = false;
        this.to = true;
      });
    }

    if (type.srcElement.id == 'device') {
      this.deviceService.getAllDevice().subscribe(data => {
        this.inventories = data;
        this.mat = false;
        this.to = false;
        this.dev = true;
      });
    }

  }

  initEventSubmit(formId: any) {

    formId.addEventListener(
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

  associateValues() {
    this.kit.name = this.name.value;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
      'multi': new FormControl('', []),
      'newQuantity': new FormControl('', [FormValidators.required])
    });
  }

  get name() { return this.reactForm.get('name'); }
  get multi() { return this.reactForm.get('multi'); }
  get newQuantity() { return this.reactForm.get('newQuantity'); }

  return() {
    if (this.kit.name != undefined) {

      this.kit.name = this.name.value;

      this.kitService.insertKitWorkOrder(this.kit).subscribe(data => {
        console.log(data.name)
        if (data.name == 'exist') {
          this.save = true;
        } else {
          this.kitCreated = data;

          this.implements = true;
          this.add = false;
        }
      });
    }
  }


  addToList() {

    if (this.to) {
      this.addTool();
      console.log(this.selectedSuppliesTool);
    }

    if (this.mat) {
      this.addMaterial();
      console.log(this.selectedSuppliesMaterial);
    }

    if (this.dev) {
      this.addDevice();
      console.log(this.selectedSuppliesDevice);
    }

  }


  addDevice() {
    let suppliesdevice = new SuppliesDevice();

    if (this.multi.value != undefined && this.newQuantity != undefined) {
      suppliesdevice.id.kitWorkOrder = this.kitCreated;
      suppliesdevice.id.device = this.multi.value;
      suppliesdevice.quantity = this.newQuantity.value

      this.selectedSuppliesDevice.push(suppliesdevice);
      setTimeout(function () { alert("El artículo fue añadido"); }, 2000);
    } else {
      this.bandera = true;
    }

  }

  hidden() {
    this.bandera = false;
    this.save = false;
  }

  addTool() {
    let suppliestool = new SuppliesTool();

    if (this.multi.value != undefined && this.newQuantity != undefined) {
      suppliestool.id.kitWorkOrder = this.kitCreated;
      suppliestool.id.tool = this.multi.value;
      suppliestool.quantity = this.newQuantity.value;

      this.selectedSuppliesTool.push(suppliestool);
      setTimeout(function () { alert("El artículo fue añadido"); }, 2000);
    } else {
      this.bandera = true;
    }

  }

  addMaterial() {
    let suppliesMaterial = new SuppliesMaterial();

    if (this.multi.value != undefined && this.newQuantity != undefined) {
      suppliesMaterial.id.kitWorkOrder = this.kitCreated;
      suppliesMaterial.id.material = this.multi.value;
      suppliesMaterial.quantity = this.newQuantity.value;

      this.selectedSuppliesMaterial.push(suppliesMaterial);

      setTimeout(function () { alert("El artículo fue añadido"); }, 2000);
    } else {
      this.bandera = true;
    }

  }

  ready() {

    for (var index in this.selectedSuppliesDevice) {
      this.suppliesService.insertSuppliesDevice(this.selectedSuppliesDevice[index]).subscribe();
    }

    for (var index in this.selectedSuppliesTool) {
      this.suppliesService.insertSuppliesTool(this.selectedSuppliesTool[index]).subscribe();
    }

    for (var index in this.selectedSuppliesMaterial) {
      this.suppliesService.insertSuppliesMaterial(this.selectedSuppliesMaterial[index]).subscribe();
    }

  }

}
