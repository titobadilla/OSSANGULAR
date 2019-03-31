import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkOrderTypeService } from './work-order-type.service';
import { WorkOrderType } from 'src/model/workordertype.model';
import { DeleteComponent } from '../delete/delete.component';
import { setCulture } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteEmitterService } from '../delete/delete.emitter.service';

@Component({
  selector: 'work-order-type',
  templateUrl: './work-order-type.component.html',
  styleUrls: ['./work-order-type.component.css']
})
export class WorkOrderTypeComponent implements OnInit {

  constructor(private typeService: WorkOrderTypeService,
    private modalService: BsModalService, private deleteService: DeleteEmitterService) { }

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  public data: WorkOrderType[];
  public pageSettings: Object;
  modalRef: BsModalRef;
  @ViewChild('grid') public grid: GridComponent;

  typeId: number;
  principal: boolean = true;
  editSection: boolean = false;
  insertSection = false;
  typeDelete: WorkOrderType;

  ngOnInit(): void {
    this.getAllTypes();
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');

    this.deleteService.deleteWorkOrderType$.subscribe(data => {
      this.aceptDelete();
    });
  }

  getAllTypes() {
    this.typeService.getAllWorkOrdersType().subscribe((data: WorkOrderType[])=>{
      this.data = data;
    })
  }

  edit(element: WorkOrderType) {
    this.typeId = element.id;
    this.principal = false;
    this.editSection = true;
  }

  aceptDelete() {
    this.typeService.deleteWorkOrderType(this.typeDelete.id).subscribe(data => {
      this.getAllTypes();
    })
  }

  insert() {
    this.principal = false;
    this.insertSection = true;
  }

  openModal(workOrderType: WorkOrderType) {
    this.typeDelete = workOrderType;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar el tipo de orden',
        data: 'el tipo con el nombre: ' + workOrderType.name,
        type: 'type'
      }
    });
  }
}
