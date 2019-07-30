import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { WorkOrderService } from 'src/app/work-order/work-order.service';
import { WorkOrderTypeService } from 'src/app/work-order-type/work-order-type.service';
import { setCulture } from '@syncfusion/ej2-base';
import { WorkOrderType } from 'src/model/workordertype.model';
import { ClickEventArgs } from '@syncfusion/ej2-splitbuttons';

@Component({
  selector: 'app-report-by-type',
  templateUrl: './report-by-type.component.html',
  styleUrls: ['./report-by-type.component.css']
})
export class ReportByTypeComponent  implements OnInit,AfterViewInit {
  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 16;
  }
  public toolbar: string[];

  

  //variables of range date
  public date: Object = new Date();
  fecha: Date[];
  fechaActual:String=new Date().toLocaleDateString();
  data:any[];
  typeId:number;

  types: WorkOrderType[];
  public typeWorkOrder: Object = { text: 'name', value: 'id' };
  public typeWatermark: string = 'Seleccione un tipo*';
  
  @ViewChild('grid') public grid: GridComponent;
  
  public pageSettings: Object;
  

  constructor(private workOrderService:WorkOrderService,private serviceType: WorkOrderTypeService) { }


  ngOnInit() {
    this.toolbar =['Generar PDF'];
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');
    this.serviceType.getAllWorkOrdersType().subscribe(data => {
      this.types = data;
    });
  }

  toolbarClick(args: ClickEventArgs): void {
    this.grid.pdfExport(this.getPdfExportProperties());
}

private getDate(): string {
  let date: string = '';
  date += ((new Date()).getMonth().toString()) + '/' + ((new Date()).getDate().toString());
  return date += '/' + ((new Date()).getFullYear().toString());
}

private getPdfExportProperties(): any {
  return {
    pageOrientation: 'Landscape',
      header: {
          fromTop: 0,
          height: 120,
          contents: [
              {
                  type: 'Text',
                  value: 'Reporte Ordenes de trabajo por tipo',
                  position: { x: 140, y: 0 },
                  style: { textBrushColor: '#C25050', fontSize: 25 },
              },
              {
                  type: 'Text',
                  value: 'Fecha',
                  position: { x: 600, y: 30 },
                  style: { textBrushColor: '#C67878', fontSize: 10 },
              }, 
              {
                  type: 'Text',
                  value: this.getDate(),
                  position: { x: 600, y: 50 },
                  style: { textBrushColor: '#000000', fontSize: 10 },
              } ,
              {
                  type: 'Text',
                  value: 'Escazu',
                  position: { x: 20, y: 65 },
                  style: { textBrushColor: '#000000', fontSize: 11 }
              },
              {
                  type: 'Text',
                  value: 'Tel +506 27112535',
                  position: { x: 20, y: 80 },
                  style: { textBrushColor: '#000000', fontSize: 11 }
              },
          ]
      },
      footer: {
          fromBottom: 160,
          height: 100,
          contents: [
            /*  {
                  type: 'Text',
                  value: 'Thank you for your business !',
                  position: { x: 250, y: 20 },
                  style: { textBrushColor: '#C67878', fontSize: 14 }
              }*/
          ]
      },
      
      fileName: "Reporte de ordenes de trabajo por tipo.pdf"
  };
}

  list() {
    var startDate=this.fecha[0].toISOString().substring(0,10);
    var endDate=this.fecha[1].toISOString().substring(0,10);  
   this.workOrderService.getReportByTypeAndDate(this.typeId,startDate, endDate).subscribe(data => {
      this.data = data;      
    });
  }


}
