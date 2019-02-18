import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkOrderDetailService } from '../work-order-detail.service';
import { WorkOrderDetail } from 'src/model/workorderdetail.model';
import { setCulture, removeClass, addClass } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
@Component({
  selector: 'app-search-work-order-detail',
  templateUrl: './search-work-order-detail.component.html',
  styleUrls: ['./search-work-order-detail.component.css']
})
export class SearchWorkOrderDetailComponent implements OnInit {

  public date: Object = new Date();
  fecha: Date[];
  details:WorkOrderDetail[] = new Array();
  rangeSection=true;
  tableSection=false;
  public fields: Object = { text: 'name', value: 'id' };
  public data: WorkOrderDetail[];
  public pageSettings: Object;
  @ViewChild('grid') public grid: GridComponent;
  public flag: boolean = false;
  public dataBound(): void {
    this.flag = true;
}

  constructor(private detailService:WorkOrderDetailService) { }

  ngOnInit() {
    this.detailService.getAllWorkOrderDetail().subscribe(data=>{
      this.data=data;
      this.splitDatesHours(this.data);
    });
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');
  
  }

  list(){
    this.detailService.getByDatesWorkOrderDetail(this.fecha[0],this.fecha[1]).subscribe(data=>{
      this.details = data;
      this.tableSection=true;
    });  
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

}