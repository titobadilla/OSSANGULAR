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
  selectedSuppliesDevice: SuppliesDevice[];
  selectedSuppliesTool: SuppliesTool[];
  selectedSuppliesMaterial: SuppliesMaterial[];

  materials: Material[];
  public material: Object = { text: 'name', value: 'id' };
  public materialWatermark: string = 'Seleccione los materiales*';

  devices: Device[];
  public device: Object = { text: 'name', value: 'id' };
  public deviceWatermark: string = 'Seleccione los dispositivos*';

  tools: Tool[];
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
      'deviceQuantity': new FormControl('', [FormValidators.required]),
      'toolQuantity': new FormControl('', [FormValidators.required]),
      'materialQuantity': new FormControl('', [FormValidators.required])
    });
  }

  get name() { return this.reactForm.get('name'); }
  get devicesMulti() { return this.reactForm.get('devicesMulti'); }
  get materialsMulti() { return this.reactForm.get('materialsMulti'); }
  get toolsMulti() { return this.reactForm.get('toolsMulti'); }
  get deviceQuantity() { return this.reactForm.get('deviceQuantity'); }
  get materialQuantity() { return this.reactForm.get('materialQuantity'); }
  get toolQuantity() { return this.reactForm.get('toolQuantity'); }


  return() {
    this.kit.name = this.name.value;
    this.implements = true;
    /*/
        this.kitService.insertKitWorkOrder(this.kit).subscribe(data => {
          this.kitCreated = data;
          
        });/*/
  }

  addDevice() {
    let suppliesdevice = new SuppliesDevice();

    if (this.devicesMulti.value != undefined && this.deviceQuantity != undefined) {
      suppliesdevice.id.kitWorkOrder = this.kitCreated;
      suppliesdevice.id.device = this.devicesMulti.value;
      suppliesdevice.quantity = this.deviceQuantity.value;

      this.selectedSuppliesDevice.push(suppliesdevice);

    } else {
      this.bandera = true;
    }

  }

  hidden() {
    this.bandera = false;
  }

  addTool() {
    let suppliestool = new SuppliesTool();

    if (this.toolsMulti.value != undefined && this.toolQuantity != undefined) {
      suppliestool.id.kitWorkOrder = this.kitCreated;
      suppliestool.id.tool = this.toolsMulti.value;
      suppliestool.quantity = this.toolQuantity.value;

      this.selectedSuppliesTool.push(suppliestool);

    } else {
      this.bandera = true;
    }

  }

  addMaterial() {
    let suppliesMaterial = new SuppliesMaterial();

    if (this.materialsMulti.value != undefined && this.materialQuantity != undefined) {
      suppliesMaterial.id.kitWorkOrder = this.kitCreated;
      suppliesMaterial.id.material = this.materialsMulti.value;
      suppliesMaterial.quantity = this.materialQuantity.value;

      this.selectedSuppliesMaterial.push(suppliesMaterial);

    } else {
      this.bandera = true;
    }

  }

}
