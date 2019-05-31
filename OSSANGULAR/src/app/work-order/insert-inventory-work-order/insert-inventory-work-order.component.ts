import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { setCulture } from '@syncfusion/ej2-base';
import { KitWorkOrderService } from 'src/app/kit-work-order/kit-work-order.service';
import { SuppliesTool } from 'src/model/suppliestool.model';
import { SuppliesDevice } from 'src/model/suppliesDevice.model';
import { SuppliesMaterial } from 'src/model/suppliesMaterial.model';
import { KitWorkOrder } from 'src/model/kitWorkOrder.model';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'insert-inventory-work-order',
  templateUrl: './insert-inventory-work-order.component.html',
  styleUrls: ['./insert-inventory-work-order.component.css']
})
export class InsertInventoryWorkOrderComponent implements OnInit, AfterViewInit {

  ngAfterViewInit():void {
   this.gridDevice.pageSettings.pageSize = 2;
   this.gridMaterial.pageSettings.pageSize = 2;
   this.gridTool.pageSettings.pageSize = 2;
  }

  reactForm: FormGroup;
  //workOrder: WorkOrder = new WorkOrder();
  public tools: SuppliesTool[];
  public devices:SuppliesDevice[];
  public materials:SuppliesMaterial[];
  public pageSettings: Object;

  kitSelected : KitWorkOrder = new KitWorkOrder();
  kitsWorkOrder: KitWorkOrder[];
  public kitWorkOrder: Object = { text: 'name', value: 'id' };
  public kitWatermark: string = 'Seleccione una lista*';

  @ViewChild('gridDevice') public gridDevice: GridComponent;
  @ViewChild('gridMaterial') public gridMaterial: GridComponent;
  @ViewChild('gridTool') public gridTool: GridComponent;


  constructor(private kitService:KitWorkOrderService) {    
     this.createReactiveForm();
   // this.associateValues();
  }

  ngOnInit() {
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');

    this.kitService.getAllKitWorkOrder().subscribe(data=>{
      this.kitsWorkOrder = data;
    })

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

  onChangeDdl(value: any) {
    if (value.itemData != undefined) {
     this.kitSelected = this.findKitById(value.itemData.id);
     this.devices = this.kitSelected.listSuppliesDevices;
     this.tools = this.kitSelected.listSuppliesTools;
     this.materials = this.kitSelected.listSuppliesMaterials;

    }
  }

  findKitById(id: number): any {
    let elementReturn;
    this.kitsWorkOrder.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }
}
