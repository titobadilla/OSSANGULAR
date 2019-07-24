import { Component, OnInit, ViewChild } from '@angular/core';
import { KitWorkOrder } from 'src/model/kitWorkOrder.model';
import { FormGroup, FormControl } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { setCulture } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { KitWorkOrderService } from '../kit-work-order.service';
import { MaterialService } from 'src/app/material/material.service';
import { ToolService } from 'src/app/tool/tool.service';
import { DeviceService } from 'src/app/device/device.service';
import { SuppliesDevice } from 'src/model/suppliesDevice.model';
import { SuppliesTool } from 'src/model/suppliesTool.model';
import { SuppliesMaterial } from 'src/model/suppliesMaterial.model';
import { SuppliesService } from './supplies.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Device } from 'src/model/device.model';
import { Material } from 'src/model/material.model';
import { Tool } from 'src/model/tool.model';

@Component({
  selector: 'app-insert-kit-work-order',
  templateUrl: './insert-kit-work-order.component.html',
  styleUrls: ['./insert-kit-work-order.component.css']
})
export class InsertKitWorkOrderComponent implements OnInit {


  public data: any[];
  public pageSettings: Object;
  modalRef: BsModalRef;
  @ViewChild('grid') public grid: GridComponent;

  reactForm: FormGroup;
  kit: KitWorkOrder = new KitWorkOrder();
  kitCreated: KitWorkOrder = new KitWorkOrder();
  bandera: boolean = false;
  implements: boolean = false;
  add: boolean = true;
  dev: boolean = false;
  to: boolean = false;
  mat: boolean = false;
  save: boolean = false;

  kitList: KitWorkOrder[] = new Array();
  materials: Material[] = new Array();
  devices: Device[] = new Array();
  tools: Tool[] = new Array();

  selectedSuppliesDevice: SuppliesDevice[] = new Array();
  selectedSuppliesTool: SuppliesTool[] = new Array();
  selectedSuppliesMaterial: SuppliesMaterial[] = new Array();

  inventories: any[];
  public inventory: Object = { text: 'name', value: 'id' };
  public watermark: string = 'Seleccione un artículo*';

  constructor(private modalService: BsModalService, private kitWorkOrderService: KitWorkOrderService,
    private materialService: MaterialService, private toolService: ToolService, private deviceService: DeviceService,
    private kitService: KitWorkOrderService, private suppliesService: SuppliesService) {
    this.createReactiveForm();
    this.associateValues();
  }


  ngOnInit() {
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');

    this.materialService.getAllMaterial().subscribe(data => {
      this.materials = data;
    });

    this.toolService.getAllTool().subscribe(data => {
      this.tools = data;
    });

    this.deviceService.getAllDevice().subscribe(data => {
      this.devices = data;
    });

  }

  fillDropdown(type: any) {

    if (type.srcElement.id == 'material') {

      this.inventories = this.materials;
      this.to = false;
      this.dev = false;
      this.mat = true;
      this.data = this.selectedSuppliesMaterial;

    }

    if (type.srcElement.id == 'tool') {

      this.inventories = this.tools;
      this.mat = false;
      this.dev = false;
      this.to = true;
      this.data = this.selectedSuppliesTool;

    }

    if (type.srcElement.id == 'device') {

      this.inventories = this.devices;
      this.mat = false;
      this.to = false;
      this.dev = true;
      this.data = this.selectedSuppliesDevice;

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

    }

    if (this.mat) {
      this.addMaterial();

    }

    if (this.dev) {
      this.addDevice();
    }

  }


  addDevice() {
    let suppliesdevice = new SuppliesDevice();

    if (this.multi.value != undefined && this.newQuantity != undefined) {
      suppliesdevice.id.kitWorkOrder = this.kitCreated;
      suppliesdevice.id.device = this.findInventoryById(this.multi.value, this.devices);
      suppliesdevice.quantity = this.newQuantity.value

      this.selectedSuppliesDevice.push(suppliesdevice);
      setTimeout(function () { alert("El artículo fue añadido"); }, 2000);
    } else {
      this.bandera = true;
    }

  }

  findInventoryById(id: number, arr): any {
    let elementReturn;
    arr.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  hidden() {
    this.bandera = false;
    this.save = false;
  }

  addTool() {
    let suppliestool = new SuppliesTool();

    if (this.multi.value != undefined && this.newQuantity != undefined) {
      suppliestool.id.kitWorkOrder = this.kitCreated;
      suppliestool.id.tool = this.findInventoryById(this.multi.value, this.tools);
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
      suppliesMaterial.id.material = this.findInventoryById(this.multi.value, this.materials);
      suppliesMaterial.quantity = this.newQuantity.value;

      this.selectedSuppliesMaterial.push(suppliesMaterial);

      setTimeout(function () { alert("El artículo fue añadido"); }, 2000);
    } else {
      this.bandera = true;
    }

  }

  ready() {

    if (this.selectedSuppliesDevice.length != 0 || this.selectedSuppliesMaterial.length != 0 || this.selectedSuppliesTool.length != 0) {
      for (var index in this.selectedSuppliesDevice) {
        this.suppliesService.insertSuppliesDevice(this.selectedSuppliesDevice[index]).subscribe();
      }

      for (var index in this.selectedSuppliesTool) {
        this.suppliesService.insertSuppliesTool(this.selectedSuppliesTool[index]).subscribe();
      }

      for (var index in this.selectedSuppliesMaterial) {
        this.suppliesService.insertSuppliesMaterial(this.selectedSuppliesMaterial[index]).subscribe();
      }

    } else {
      setTimeout(function () { alert("Debe ingresar almenos un artículo a la lista"); }, 1000);
    }
  }

  removeElementAddedOfTable(arr, elementSelected) {
    let aux;
    arr.forEach((element, index) => {
      if (element.id.device.id == elementSelected) {
        aux = this.arrayRemove(arr, index);
      }
    });
    return aux;
  }

  arrayRemove(arr, value) {
    return arr.filter(function (ele, index) {
      return index != value;
    });
  }


  removeOfTable(data: any) {

    if (this.dev == true) {
      this.selectedSuppliesDevice = this.removeElementAddedOfTable(this.selectedSuppliesDevice, data.id.device.id);
    } if (this.mat == true) {
      this.selectedSuppliesMaterial = this.removeElementAddedOfTable(this.selectedSuppliesMaterial, data.id.material.id);
    }
    if (this.to == true) {
      this.selectedSuppliesTool = this.removeElementAddedOfTable(this.selectedSuppliesTool, data.id.tool.id);

    }

  }
}
