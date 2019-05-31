import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WorkOrderDetail } from 'src/model/workOrderDetail.model';
import { setCulture, removeClass, addClass } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DeleteComponent } from 'src/app/delete/delete.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteEmitterService } from 'src/app/delete/delete.emitter.service';
import { WorkOrderDetailService } from './work-order-detail.service';
@Component({
  selector: 'work-order-detail',
  templateUrl: './work-order-detail.component.html',
  styleUrls: ['./work-order-detail.component.css']
})
export class WorkOrderDetailComponent implements OnInit {

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  //variables of range date
  public date: Object = new Date();
  fecha: Date[];

  //sections
  rangeSection = true;
  insertSection = false;
  editSection = false;

  modalRef: BsModalRef;
  detailDelete: WorkOrderDetail = new WorkOrderDetail();
  detailid:number;

  //variables of table
  public data: WorkOrderDetail[];
  public pageSettings: Object;
  @ViewChild('grid') public grid: GridComponent;

  //variables of header table options
  public flag: boolean = false;
  public dataBound(): void {
    this.flag = true;
  }

  constructor(private detailService: WorkOrderDetailService,
    private modalService: BsModalService
    , private deleteService: DeleteEmitterService) {
    this.data = new Array();
  }

  ngOnInit() {
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');

    this.deleteService.deleteWorkOrderDetail$.subscribe(data => {
      this.acceptDelete(this.detailDelete.id);
    });
  }

  list() {
    this.detailService.getByDatesWorkOrderDetail(this.fecha[0], this.fecha[1]).subscribe(data => {
      this.data = data;
      this.splitDatesHours(this.data);
    });
  }

  insert() {
    this.rangeSection = false;
    this.insertSection = true;
  }

  edit(detail:WorkOrderDetail) {
    this.detailid = detail.id;
    this.rangeSection = false;
    this.editSection = true;
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

  splitDatesHours(data: WorkOrderDetail[]) {
    data.forEach(element => {
      element.date = element.date.split("T")[0];
      element.checkIn = element.checkIn.split(".")[0];
      element.checkOut = element.checkOut.split(".")[0];
    });
  }

  acceptDelete(detailid:number) {
    this.detailService.deleteWorkOrderDetail(detailid).subscribe(data => {
      this.list();
    });
  }

  openModal(detail: WorkOrderDetail) {
    this.detailDelete = detail;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar Detalle de Orden',
        data: 'el detalle de la factura: ' + detail.invoiceId,
        type: 'workOrderDetail'
      }
    });
  }

}
