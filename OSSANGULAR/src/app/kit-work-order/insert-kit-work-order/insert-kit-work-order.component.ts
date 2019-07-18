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
  //multi select
  @ViewChild('checkbox') public mulObj: MultiSelectComponent;

  materials: Material[];
  selectedMaterials: SuppliesMaterial[] = new Array();
  public material: Object = { text: 'name', value: 'id' };
  public materialWatermark: string = 'Seleccione los materiales*';

  devices: Device[];
  selectedDevices: SuppliesDevice[] = new Array();
  public device: Object = { text: 'name', value: 'id' };
  public deviceWatermark: string = 'Seleccione los dispositivos*';

  tools: Tool[];
  selectedTools: SuppliesTool[] = new Array();
  public tool: Object = { text: 'name', value: 'id' };
  public toolWatermark: string = 'Seleccione las herramientas*';

  constructor(private kitWorkOrderService: KitWorkOrderService,
    private materialService: MaterialService, private toolService: ToolService, private deviceService: DeviceService,
    private kitService: KitWorkOrderService, private suppliesService: SuppliesService) {
    this.createReactiveForm();
    this.associateValues();
  }


  ngOnInit() {
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
      'devicesMulti': new FormControl('', []),
      'materialsMulti': new FormControl('', []),
      'toolsMulti': new FormControl('', []),
    });
  }

  get name() { return this.reactForm.get('name'); }
  get devicesMulti() { return this.reactForm.get('devicesMulti'); }
  get materialsMulti() { return this.reactForm.get('materialsMulti'); }
  get toolsMulti() { return this.reactForm.get('toolsMulti'); }

  createKit() {
    this.kitService.insertKitWorkOrder(this.kit).subscribe(data => {
      this.kitCreated = data;
    })
  }

  selectMaterial(value: any) {
    let action = value.name;
    let material = value.itemData as Material;
    let aux;
    let suppliesMaterial: SuppliesMaterial = new SuppliesMaterial();

    suppliesMaterial.id.kitWorkOrder = this.kitCreated;
    suppliesMaterial.id.material = material;
    suppliesMaterial.quantity = material.quantity;

    if (action === 'select') {
      this.selectedMaterials.push(suppliesMaterial);
    } else if (action = 'removing') {
      this.selectedMaterials.forEach((element, index) => {
        if (element.id.material.id === suppliesMaterial.id.material.id) {
          aux = this.arrayRemove(this.selectedMaterials, index);
        }
      });
      this.selectedMaterials = aux;
    }
  }

  selectDevice(value: any) {
    let action = value.name;
    let device = value.itemData as Device;
    let aux;
    let suppliesDevice: SuppliesDevice = new SuppliesDevice();

    suppliesDevice.id.kitWorkOrder = this.kitCreated;
    suppliesDevice.id.device = device;
    suppliesDevice.quantity = device.quantity;

    if (action === 'select') {
      this.selectedDevices.push(suppliesDevice);
    } else if (action = 'removing') {
      this.selectedDevices.forEach((element, index) => {
        if (element.id.device.id === suppliesDevice.id.device.id) {
          aux = this.arrayRemove(this.selectedMaterials, index);
        }
      });
      this.selectedMaterials = aux;
    }
  }

  selectTool(value: any) {
    let action = value.name;
    let tool = value.itemData as Tool;
    let aux;
    let suppliesTool: SuppliesTool = new SuppliesTool();

    suppliesTool.id.kitWorkOrder = this.kitCreated;
    suppliesTool.id.tool = tool;
    suppliesTool.quantity = tool.quantity;

    if (action === 'select') {
      this.selectedTools.push(suppliesTool);
    } else if (action = 'removing') {
      this.selectedTools.forEach((element, index) => {
        if (element.id.tool.id === suppliesTool.id.tool.id) {
          aux = this.arrayRemove(this.selectedTools, index);
        }
      });
      this.selectedTools = aux;
    }
  }

  arrayRemove(arr, value) {
    return arr.filter(function (ele, index) {
      return index != value;
    });
  }

  return() {
    this.kit.name = this.name.value;

   /*/ this.kitService.insertKitWorkOrder(this.kit).subscribe(data => {
      this.kitCreated = data;
      
    });/*/
  }

  assignLists() {

    for (var element in this.selectedDevices) {
      
      this.selectedDevices[element].id.kitWorkOrder = this.kitCreated;
    }
    for (var element in this.selectedMaterials) {
      this.selectedMaterials[element].id.kitWorkOrder = this.kitCreated;
    }
    for (var element in this.selectedTools) {
      this.selectedTools[element].id.kitWorkOrder = this.kitCreated;
    }

  }


}
