import { Component, OnInit,ViewChild } from '@angular/core';
import { DeviceStateService } from './device-state.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteEmitterService } from '../delete/delete.emitter.service';
import { setCulture } from '@syncfusion/ej2-base';
import { DeviceState } from 'src/model/devicestate.model';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'device-state',
  templateUrl: './device-state.component.html',
  styleUrls: ['./device-state.component.css']
})
export class DeviceStateComponent implements OnInit {

 
  constructor(private deviceStateService: DeviceStateService,
    private modalService: BsModalService, private deleteService: DeleteEmitterService) { }

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  public data: DeviceState[];
  public pageSettings: Object;
  modalRef: BsModalRef;
  @ViewChild('grid') public grid: GridComponent;

  deviceStateId: number;
  principal: boolean = true;
  editSection: boolean = false;
  insertSection = false;
  deviceStateDelete: DeviceState;

  ngOnInit(): void {
    this.getAllStates();
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');

    this.deleteService.deleteDeviceState$.subscribe(data => {
      this.aceptDelete();
    });
  }

  getAllStates() {
    this.deviceStateService.getAllDevicestates().subscribe((data: DeviceState[]) => {
      this.data = data;
    });
  }

  edit(element: DeviceState) {
    this.deviceStateId = element.id;
    this.principal = false;
    this.editSection = true;
  }

  aceptDelete() {
    this.deviceStateService.deleteDeviceState(this.deviceStateDelete.id).subscribe(data => {
      this.getAllStates();
    })
  }

  insert() {
    this.principal = false;
    this.insertSection = true;
  }

  openModal(deviceState: DeviceState) {
    this.deviceStateDelete = deviceState;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar Estado de Dispositivo',
        data: 'el estado con el nombre: ' + deviceState.state,
        type: 'deviceState'
      }
    });
  }
}

