import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { WorkOrderService } from './work-order.service';
import { WorkOrder } from 'src/model/workOrder.model';
import { WorkOrderTypeService } from '../work-order-type/work-order-type.service';
import { ClientService } from '../client/client.service';
import { EmployeeService } from '../employee/employee.service';
import { Client } from 'src/model/client.model';
import { Employee } from 'src/model/employee.model';
import { WorkOrderType } from 'src/model/workordertype.model';
import { ColorService } from '../color/color.service';
import { Color } from 'src/model/color.model';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import { Observable } from 'rxjs';
import { InsertAdicionalToolWorkOrderComponent } from './insert-adicional-tool-work-order/insert-adicional-tool-work-order.component';
import { InsertAdicionalMaterialWorkOrderComponent } from './insert-adicional-material-work-order/insert-adicional-material-work-order.component';
import { InsertInventoryWorkOrderComponent } from './insert-inventory-work-order/insert-inventory-work-order.component';
import { InsertAdicionalDeviceWorkOrderComponent } from './insert-adicional-device-work-order/insert-adicional-device-work-order.component';

@Component({
  selector: 'work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {
 

  startHourWo: String;
  stopCondition:boolean=false;
  endHourWo: String;
  classNotification='notify top-left do-show';
  typeNotification:string="warning";
  messageNotification:string="Necesita tener al menos una lista predefinada o algún artículo de inventario asociado.";

  reactForm: FormGroup;
  @ViewChild(InsertAdicionalToolWorkOrderComponent) insertAditionalToolWorkOrder;
  @ViewChild(InsertAdicionalMaterialWorkOrderComponent) insertAditionalMaterialWorkOrder;
  @ViewChild(InsertAdicionalDeviceWorkOrderComponent) insertAditionalDeviceWorkOrder;
  @ViewChild(InsertInventoryWorkOrderComponent) insertInventoryWorkOrder;
  flagWarning:boolean=false;


  constructor(private workOrderService: WorkOrderService,
    private serviceWorkOrderTypes: WorkOrderTypeService,
    private serviceClient: ClientService,
    private serviceEmployee: EmployeeService,
    private serviceWorkOrder: WorkOrderService,
    private serviceColors: ColorService
    ) {
      this.createReactiveForm();
      this.associateValues();
      this.initStart();   
  }

  //multi select
  @ViewChild('checkbox') public mulObj: MultiSelectComponent;
  @ViewChild('selectall') public checkboxObj: CheckBoxComponent;

  employees: Employee[];
  selectedEmployees: Employee[] = new Array();
  public employeeWorkOrder: Object = { text: 'name', value: 'id' };
  public employeeWatermark: string = 'Seleccione los empleados*';

  workOrder: WorkOrder = new WorkOrder();

  workOrdersType: WorkOrderType[];
  public typeWorkOrder: Object = { text: 'name', value: 'id' };
  public typeWatermark: string = 'Seleccione un tipo*';

  clients: Client[];
  public clientWorkOrder: Object = { text: 'name', value: 'id' };
  public clientWatermark: string = 'Seleccione un cliente*';

  colors: Color[];
  public colorWorkOrder: Object = { text: 'state', value: 'id' };
  public colorWatermark: string = 'Seleccione un color*';
  completeWorkOrder: boolean = false;

  ngOnInit() {
    this.serviceWorkOrderTypes.getAllWorkOrdersType().subscribe(data => {
      this.workOrdersType = data;
    });

    this.serviceClient.getAllClients().subscribe(data => {
      this.clients = data;
    });

    this.serviceEmployee.getAllEmployees().subscribe(data => {
      this.employees = data;
    })

    this.serviceColors.getAllColors().subscribe(data => {
      this.colors = data;
    });
    
  }

  initEventSubmit(formId:any) {
   
   formId.addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
      
          //this.completeWorkOrder = true;
          this.validateCompleteWorkOrder();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });
  }

 private validateCompleteWorkOrder(){
   
    if((this.insertAditionalDeviceWorkOrder!=undefined && this.insertAditionalDeviceWorkOrder.selectedDevices.length>0) ||
      (this.insertAditionalMaterialWorkOrder!=undefined && this.insertAditionalMaterialWorkOrder.selectedMaterials.length>0) ||
      (this.insertAditionalToolWorkOrder!=undefined && this.insertAditionalToolWorkOrder.selectedTools.length>0) || 
      (this.insertInventoryWorkOrder!=undefined && this.insertInventoryWorkOrder.kitSelected.id>0)){

        this.workOrder.kitWorkOrder=this.insertInventoryWorkOrder!=undefined?this.insertInventoryWorkOrder.kitSelected:null;
        this.workOrder.listWorkOrderDevices=this.insertAditionalDeviceWorkOrder!=undefined?this.insertAditionalDeviceWorkOrder.selectedDevices:null;
        this.workOrder.listWorkOrderMaterials=this.insertAditionalMaterialWorkOrder!=undefined?this.insertAditionalMaterialWorkOrder.selectedMaterials:null;
        this.workOrder.listWorkOrderTools=this.insertAditionalToolWorkOrder!=undefined?this.insertAditionalToolWorkOrder.selectedTools:null;
        this.createWorkOrder();
      }
      else{
        this.initTimeWarning();       
      }

 }

 initTimeWarning(){
   this.flagWarning=true;
  Observable.interval(1000)
    .takeWhile(() => this.flagWarning)
    .subscribe(i => {
      if(i==4){
        this.flagWarning=false;
      }       
    })

}


  initStart(){
    Observable.interval(1000)
      .takeWhile(() => !this.stopCondition)
      .subscribe(i => {
        let formId: HTMLElement = <HTMLElement>document.getElementById('formId'); 
        if(formId!=undefined){
          this.initEventSubmit(formId);
          this.stopCondition=true;
        }
         
      })
  
  }

  associateValues() {
    this.workOrder.description = this.description.value;
    this.workOrder.client.id = this.client.value;
    this.workOrder.startDate = "" + this.workOrder.startDate + "T" + this.startHour.value + "-0600"
    this.workOrder.endDate = "" + this.workOrder.endDate + "T" + this.endHour.value + "-0600"
    this.workOrder.workOrderType.id = this.workOrderType.value;
    this.workOrder.color.id = this.color.value;
    this.workOrder.employees = this.selectedEmployees;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'description': new FormControl('', [FormValidators.required]),
      'client': new FormControl('', [this.valueRequired]),
      'startDate': new FormControl('', [FormValidators.required]),
      'startHour': new FormControl('', [FormValidators.required]),
      'endDate': new FormControl('', [FormValidators.required]),
      'endHour': new FormControl('', [FormValidators.required]),
      'type': new FormControl('', [this.valueRequired]),
      'color': new FormControl('', [this.valueRequired]),
      'employeesMulti': new FormControl('', []),
    });
  }

  get description() { return this.reactForm.get('description'); }
  get client() { return this.reactForm.get('client'); }
  get startDate() { return this.reactForm.get('startDate'); }
  get startHour() { return this.reactForm.get('startHour'); }
  get endDate() { return this.reactForm.get('endDate'); }
  get endHour() { return this.reactForm.get('endHour'); }
  get workOrderType() { return this.reactForm.get('type'); }
  get color() { return this.reactForm.get('color'); }
  get employeesMulti() { return this.reactForm.get('employeesMulti'); }


  valueRequired(control: FormControl) {
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


  public createWorkOrder() {

    // this.addInventoryToWorkOrder();

    /*let i = 0;
    let size=this.selectedEmployees.length;
    console.log(size);
    for (i = 0; i < size; i++) {
      let employee: Employee = new Employee();
      employee.id = this.selectedEmployees[i].id;
      this.workOrder.employees.push(employee);
    }*/
    console.log(this.workOrder);
    this.serviceWorkOrder.insertWorkOrder(this.workOrder).subscribe();
    //this.workOrder = new WorkOrder();
    //this.selectedEmployees = [];

  }

  /*/addInventoryToWorkOrder() {
    let i = 0;
    for (i = 0; i < this.selectedMaterials.length; i++) {
      let material: WorkOrderMaterial = new WorkOrderMaterial();
      material.id.material.id = this.selectedMaterials[i].id;
      ///material.quantity = this.quantityMaterial;
      this.workOrder.listWorkOrderMaterials.push(material);
    }

    let x = 0;
    for (x = 0; x < this.selectedDevices.length; x++) {
      let device: WorkOrderDevice = new WorkOrderDevice();
      device.id.device.id = this.selectedDevices[x].id;
      device.quantity = this.quantityDevice;
      this.workOrder.listWorkOrderDevices.push(device);
    }
    let y = 0;
    for (y = 0; y < this.selectedTools.length; y++) {
      let tool: WorkOrderTool = new WorkOrderTool();
      tool.id.tool.id = this.selectedTools[y].id;
      this.workOrder.listWorkOrderTools.push(tool);
    }
  }
/*/
  selectEmployee(value: any) {
    let action = value.name;
    let employee = value.itemData as Employee;
    let aux;

    if (action === 'select') {
      this.selectedEmployees.push(employee);
    } else if (action = 'removing') {
      this.selectedEmployees.forEach((element, index) => {
        if (element.id === employee.id) {
          aux = this.arrayRemove(this.selectedEmployees, index);
        }
      });
      this.selectedEmployees = aux;
    }
  }

  arrayRemove(arr, value) {
    return arr.filter(function (ele, index) {
      return index != value;
    });
  }

  // Mapping Tab items Header property   
  public headerText:
    Object = [{ text: 'Orden de Trabajo' },
    { text: 'Agregar Lista Predefinida' },
    { text: 'Agregar Material Adicional' },
    { text: 'Agregar Herramienta Adicional' },
    { text: 'Agregar Dispositivo Adicional' }];

  formatDates() {
    this.workOrder.startDate = this.workOrder.startDate + "T" + this.startHour.value + "-0600";
    this.workOrder.endDate = this.workOrder.endDate + "T" + this.endHour.value + "-0600";
    //console.log(this.reactForm.status);
    //console.log(this.workOrder);    
  }
}

