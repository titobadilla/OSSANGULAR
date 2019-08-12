import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { setCulture } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteEmitterService } from '../delete/delete.emitter.service';
import { DeleteComponent } from '../delete/delete.component';
import { KitWorkOrder } from 'src/model/kitWorkOrder.model';
import { KitWorkOrderService } from './kit-work-order.service';

@Component({
  selector: 'kit-work-order',
  templateUrl: './kit-work-order.component.html',
  styleUrls: ['./kit-work-order.component.css']
})
export class KitWorkOrderComponent implements OnInit,AfterViewInit {

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  public data: KitWorkOrder[];
  private kitWorkOrderDelete: KitWorkOrder;
  public pageSettings: Object;
  modalRef: BsModalRef;

  principal: boolean = true;
  insertSection = false;
  seeMoreKit: boolean =false;
  kitId: number;

  @ViewChild('grid') public grid: GridComponent;

  constructor(private kitWorkOrderService: KitWorkOrderService,
    private modalService: BsModalService, private deleteService: DeleteEmitterService) {
  }

  ngOnInit() {

    this.getAllKits();
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');

    this.deleteService.deleteKitWorkOrder$.subscribe(data => {
      this.aceptDelete();
    });
  }

  getAllKits() {
    this.kitWorkOrderService.getAllKitWorkOrder().subscribe((data: KitWorkOrder[]) => {
      this.data = data;
    });
  }


  aceptDelete() {
    
    this.kitWorkOrderService.deleteKitWorkOrder(this.kitWorkOrderDelete.id).subscribe(data => {
      this.getAllKits();
    })
  }

  insert() {
    this.principal = false;
    this.insertSection = true;
  }

  seeMore(element: KitWorkOrder){
    this.kitId = element.id;
    this.principal = false;
    this.seeMoreKit =true;
  }

  openModal(kitWorkOrder: KitWorkOrder) {
    this.kitWorkOrderDelete = kitWorkOrder;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar la lista predefinida',
        data: 'la lista con el nombre: ' + kitWorkOrder.name,
        type: 'kitWorkOrder'
      }
    });
  }

}
