import { Component, OnInit,ViewChild } from '@angular/core';
import { DeviceService } from './device.service';
import { Device } from 'src/model/device.model';
import { UpdateDeviceComponent } from './update-device/update-device.component';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { setCulture, removeClass, addClass } from '@syncfusion/ej2-base';


@Component({
  selector: 'device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  constructor(private deviceService:DeviceService) { }

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }
  public flag: boolean = false;
  public dataBound(): void {
    this.flag = true;
}
  public data: Device[];
  public pageSettings: Object;
  @ViewChild('updateDevice') childOne: UpdateDeviceComponent;
  @ViewChild('grid') public grid: GridComponent;

  deviceid: number;
  principal: boolean = true;
  editSection: boolean = false;
  modalDelete = false;
  insertSection = false;
  deviceDelete: Device;

  ngOnInit(): void {
    this.getAllDevices();
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');
  }


  getAllDevices() {
    this.deviceService.getAllDevice().subscribe(data=>{
      this.data= data;
    })
  }

  edit(element: Device) {
    this.deviceid = element.id;
    this.principal = false;
    this.editSection = true;
  }

  delete(device:Device) {
    this.deviceDelete = device;
    this.modalDelete = true;
  }

  hideModal() {
    this.deviceDelete = new Device();
    this.modalDelete = false;
  }

  aceptDelete() {
    this.deviceService.deleteDevice(this.deviceDelete.id).subscribe(data=>{
      this.getAllDevices();
    })
    this.modalDelete = false;
  }

  insert() {
    this.principal = false;
    this.insertSection = true;
  }

  public onClicked(e: MouseEvent): void {
    if (!this.flag) { return; }

    let element: HTMLElement = <HTMLInputElement>e.target;


    if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
        return;
    }

    element = <HTMLElement>(element.tagName === 'BUTTON' ? element.firstElementChild : element);
    this.flag = false;
    let hidden: boolean = element.classList.contains('e-ghidden');
    let classFn: Function = hidden ? removeClass : addClass;
    classFn([element], 'e-ghidden');


    if (hidden) {
        this.grid.showColumns(element.innerHTML);
    } else {
        this.grid.hideColumns(element.innerHTML);
    }
}
}

