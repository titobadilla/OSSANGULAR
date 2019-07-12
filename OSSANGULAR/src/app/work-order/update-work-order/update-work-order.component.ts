import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkOrderService } from '../work-order.service';
import { WorkOrder } from 'src/model/workOrder.model';
import { Client } from 'src/model/client.model';
import { Employee } from 'src/model/employee.model';
import { WorkOrderType } from 'src/model/workordertype.model';
import { Color } from 'src/model/color.model';
import { WorkOrderTypeService } from 'src/app/work-order-type/work-order-type.service';
import { ClientService } from 'src/app/client/client.service';
import { ColorService } from 'src/app/color/color.service';
import { EmployeeService } from 'src/app/employee/employee.service';
import { Time } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InsertAdicionalToolWorkOrderComponent } from '../insert-adicional-tool-work-order/insert-adicional-tool-work-order.component';
import { InsertAdicionalMaterialWorkOrderComponent } from '../insert-adicional-material-work-order/insert-adicional-material-work-order.component';
import { InsertAdicionalDeviceWorkOrderComponent } from '../insert-adicional-device-work-order/insert-adicional-device-work-order.component';
import { InsertInventoryWorkOrderComponent } from '../insert-inventory-work-order/insert-inventory-work-order.component';
import { FormGroup, FormControl } from '@angular/forms';
import { MultiSelectComponent, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-work-order',
  templateUrl: './update-work-order.component.html',
  styleUrls: ['./update-work-order.component.css']
})
export class UpdateWorkOrderComponent implements OnInit {

  
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
  updateInsInvWorkOrder:boolean=false;
  
  updateInsInvMaterialWorkOrder:boolean=false;  
  updateInsInvDeviceWorkOrder:boolean=false;  
  updateInsInvToolWorkOrder:boolean=false;

 //multi select
 @ViewChild('x') public mulObj: MultiSelectComponent;
 @ViewChild('ejsclient') public ddlClient: DropDownListComponent; 
 @ViewChild('ejswotype') public ddlWoType: DropDownListComponent;
 

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

  
  constructor(private workOrderService: WorkOrderService,
    private serviceWorkOrderTypes: WorkOrderTypeService,
    private serviceClient: ClientService,
    private serviceEmployee: EmployeeService,
    private serviceWorkOrder: WorkOrderService,
    private serviceColors: ColorService ,private route: ActivatedRoute,private router: Router
    ) {
      this.createReactiveForm();
      this.associateValues();
      this.initStart(); 
      this.initUpdateInsInvWorkOrder();  
      this.initUpdateInsInvMaterialWorkOrder();
      this.initUpdateInsInvDeviceWorkOrder();      
      this.initUpdateInsInvToolWorkOrder();
  }

  private splitDatesHours(data: WorkOrder) {
    let start = data.startDate.split(" ");
    let end = data.endDate.split(" ");
    this.workOrder.startDate = start[0];
    this.workOrder.endDate = end[0];
    this.reactForm.get('startHour').setValue(start[1]);
    this.reactForm.get('endHour').setValue(end[1]);
  }


  loadEmployees(){   
    let array=new Array(); 
    this.workOrder.employees.forEach(element => {    
      this.selectedEmployees.push(element);  
      array.push(element.id);
    });
   this.mulObj.value=array;
   this.workOrder.employees = this.selectedEmployees;
  }

  loadClient(){
    this.ddlClient.value=this.workOrder.client.id.toString();
  }

  loadWoType(){
    this.ddlWoType.value=this.workOrder.workOrderType.id.toString();
  }

  ngOnInit() {
   var val=this.route.snapshot.queryParams.IdWO;
    this.serviceWorkOrder.getByIdWorkOrder(val).subscribe(data => {
      this.workOrder = data;
      this.splitDatesHours(data);
      this.loadEmployees();
    });
   
   this.serviceWorkOrderTypes.getAllWorkOrdersType().subscribe(data => {
    this.workOrdersType = data;
    this.loadWoType();
  });

  this.serviceClient.getAllClients().subscribe(data => {
    this.clients = data;
    this.loadClient();
  });

  this.serviceEmployee.getAllEmployees().subscribe(data => {
    this.employees = data;
  });

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
        this.updateWorkOrder();
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


initUpdateInsInvWorkOrder(){
  Observable.interval(100)
    .takeWhile(() => !this.updateInsInvWorkOrder)
    .subscribe(i => {
      if(this.insertInventoryWorkOrder!=undefined){
        this.updateInsInvWorkOrder=true;
        this.insertInventoryWorkOrder.idUpdate=this.workOrder.kitWorkOrder.id;
      }       
    })

}

initUpdateInsInvMaterialWorkOrder(){
  Observable.interval(50)
    .takeWhile(() => !this.updateInsInvMaterialWorkOrder)
    .subscribe(i => {
      if(this.insertAditionalMaterialWorkOrder!=undefined){
        this.insertAditionalMaterialWorkOrder.dataMaterial=this.workOrder.listWorkOrderMaterials;
        this.updateInsInvMaterialWorkOrder=true;        
      }       
    })
}

initUpdateInsInvToolWorkOrder(){
  Observable.interval(50)
    .takeWhile(() => !this.updateInsInvToolWorkOrder)
    .subscribe(i => {
      if(this.insertAditionalToolWorkOrder!=undefined){
        this.insertAditionalToolWorkOrder.dataTool=this.workOrder.listWorkOrderTools;
        this.updateInsInvToolWorkOrder=true;       
      }       
    })
}


initUpdateInsInvDeviceWorkOrder(){
  Observable.interval(50)
    .takeWhile(() => !this.updateInsInvDeviceWorkOrder)
    .subscribe(i => {
      if(this.insertAditionalDeviceWorkOrder!=undefined){
        this.insertAditionalDeviceWorkOrder.dataDevice=this.workOrder.listWorkOrderDevices;
        this.updateInsInvDeviceWorkOrder=true;       
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
  public updateWorkOrder() {
    console.log(this.workOrder);
    this.serviceWorkOrder.updateWorkOrder(this.workOrder).subscribe(data=>{
      this.router.navigate(['/calendar']);
    }
    );   

  }

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
    this.workOrder.employees = this.selectedEmployees;
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
  }
}

