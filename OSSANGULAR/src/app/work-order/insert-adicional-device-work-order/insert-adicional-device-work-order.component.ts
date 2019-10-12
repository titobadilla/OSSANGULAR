import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { setCulture } from '@syncfusion/ej2-base';
import { DeleteComponent } from 'src/app/delete/delete.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteEmitterService } from 'src/app/delete/delete.emitter.service';
import { Device } from 'src/model/device.model';
import { DeviceService } from 'src/app/device/device.service';
import { WorkOrderDevice } from 'src/model/workOrderdevice.model';
@Component({
  selector: 'insert-adicional-device-work-order',
  templateUrl: './insert-adicional-device-work-order.component.html',
  styleUrls: ['./insert-adicional-device-work-order.component.css']
})
export class InsertAdicionalDeviceWorkOrderComponent implements OnInit {

  //basic variables
  reactForm: FormGroup;
  modalRef: BsModalRef;
  public pageSettings: Object;
  @ViewChild('grid') public grid: GridComponent;

  //dropdown variables
  @ViewChild('dropdown') public listObj: DropDownListComponent;
  public deviceWorkOrder: Object = { text: 'name', value: 'id' };
  public deviceWatermark: string = 'Seleccione los Dispositivos';
  devices: Device[] = new Array();

  //necessary variables
  selectedDevices: WorkOrderDevice[] = new Array();
  quantityDevice: number = 0;
  newQuantityDevice: number = 0;
  deviceSelected: WorkOrderDevice;
  addQuantityD: boolean = false;
  deviceDelete: WorkOrderDevice = new WorkOrderDevice();
  dataDevice:WorkOrderDevice[];

  constructor(private serviceDevice: DeviceService, 
    private modalService: BsModalService,
    private deleteService: DeleteEmitterService) {
    this.createReactiveForm();
  }

  ngOnInit() {

    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');
    this.serviceDevice.getAllDevice().subscribe(data => {
      this.devices = data;
      this.databaseChargedData();
    })

    this.initEventSubmit();

    this.deleteService.deleteDeviceOfWorkOrder$.subscribe(data => {
      this.deleteOfTable();
    });
  }

  

  initEventSubmit() {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.quantityDeviceNew.valid) {

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
      'devicesMulti': new FormControl('', []),
      'quantityDevice': new FormControl('', []),
      'newQuantityDevice': new FormControl('', [FormValidators.required])
    });
  }

  get devicesMulti() { return this.reactForm.get('devicesMulti'); }
  get quantityDev() { return this.reactForm.get('quantityDevice'); }
  get quantityDeviceNew() { return this.reactForm.get('newQuantityDevice'); }

  onChangeDdlDevice(value: any) {
    if (value.itemData != undefined) {

      this.deviceSelected = new WorkOrderDevice();
      this.deviceSelected.id.device = this.findDeviceById(value.itemData.id);
      this.quantityDevice = this.deviceSelected.id.device.quantity;
      this.newQuantityDevice = this.quantityDevice;

      this.quantityDev.setValue(this.quantityDevice);
      this.quantityDeviceNew.setValue(this.quantityDevice);
      this.quantityDev.disable();

      this.addQuantityD = true;
    }
    else {
      this.addQuantityD = false;
    }
  }

  findDeviceById(id: number): any {
    let elementReturn;
    this.devices.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  databaseChargedData(){
    if(this.dataDevice!=undefined){
  this.dataDevice.forEach(element => {
    this.deviceSelected=element;   
    this.addFromDatabase();
  });}

  }

  addFromDatabase() {       
      this.selectedDevices.push(this.deviceSelected);
      this.grid.refresh();
      this.devices = this.removeElementAdded(this.devices, this.deviceSelected.id.device)
      this.addQuantityD = false;
  }

  addSelectedInventory() {
    if (this.quantityDeviceNew.value != 'null' && this.quantityDeviceNew.value > 0) {
      this.deviceSelected.quantity = this.quantityDeviceNew.value;
      this.selectedDevices.push(this.deviceSelected);
      this.grid.refresh();

      this.devices = this.removeElementAdded(this.devices, this.deviceSelected.id.device)
      this.addQuantityD = false;
    } if (this.quantityDeviceNew.value <= 0) {
      this.openModalValidate(this.deviceSelected);
      this.quantityDeviceNew.reset();
    }
  }

  arrayRemove(arr, value) {
    return arr.filter(function (ele, index) {
      return index != value;
    });
  }

  removeElementAdded(arr, elementSelected) {
    let aux;
    arr.forEach((element, index) => {
      if (element.id === elementSelected.id) {
        aux = this.arrayRemove(arr, index);
      }
    });
    return aux
  }
  
  removeElementAddedOfTable(arr, elementSelected) {
    let aux;
    arr.forEach((element, index) => {
      if (element.id.device.id === elementSelected.id.device.id) {
        aux = this.arrayRemove(arr, index);
      }
    });
    return aux
  }

  openModal(device:WorkOrderDevice) {
    this.deviceDelete = device;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar el Dispositivo de la Orden de Trabajo',
        data: 'el dispositivo con el nombre: ' + device.id.device.name,
        type: 'deviceOfWorkOrder'
      }
    });
  }

  openModalValidate(device:WorkOrderDevice) {

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Alerta!',
        data: device.id.device.name,
        type: 'quantityValidate'
      }
    });
  }

  deleteOfTable() {
    this.selectedDevices = this.removeElementAddedOfTable(this.selectedDevices, this.deviceDelete)
    this.grid.refresh();
    this.devices.push(this.deviceDelete.id.device);
    //this.listObj.refresh();
  }
}
