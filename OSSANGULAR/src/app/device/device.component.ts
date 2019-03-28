import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceService } from './device.service';
import { Device } from 'src/model/device.model';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { setCulture, removeClass, addClass } from '@syncfusion/ej2-base';
import { DeleteComponent } from '../delete/delete.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteEmitterService } from '../delete/delete.emitter.service';

@Component({
  selector: 'device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  constructor(private deviceService: DeviceService, private modalService: BsModalService, private deleteService: DeleteEmitterService) { }

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }
  public flag: boolean = false;
  public dataBound(): void {
    this.flag = true;
  }
  modalRef: BsModalRef;
  public data: Device[];
  public pageSettings: Object;
  @ViewChild('grid') public grid: GridComponent;

  deviceid: number;
  principal: boolean = true;
  editSection: boolean = false;
  insertSection = false;
  deviceDelete: Device;

  ngOnInit(): void {
    this.getAllDevices();
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');

    this.deleteService.deleteDevice$.subscribe(data => {
      this.acceptDelete();
    });
  }


  getAllDevices() {
    this.deviceService.getAllDevice().subscribe(data => {
      this.data = data;
    })
  }

  edit(element: Device) {
    this.deviceid = element.id;
    this.principal = false;
    this.editSection = true;
  }

  acceptDelete() {
    this.deviceService.deleteDevice(this.deviceDelete.id).subscribe(data => {
      this.getAllDevices();
    })
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

  openModal(device: Device) {
    this.deviceDelete = device;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar el Dispositivo de Inventario',
        data: 'el dispositivo con el nombre: ' + device.name,
        type: 'device'
      }
    });
  }
}

