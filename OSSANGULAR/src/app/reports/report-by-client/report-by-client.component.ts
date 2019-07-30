import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WorkOrderService } from 'src/app/work-order/work-order.service';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/model/client.model';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { setCulture } from '@syncfusion/ej2-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';


@Component({
  selector: 'app-report-by-client',
  templateUrl: './report-by-client.component.html',
  styleUrls: ['./report-by-client.component.css']
})
export class ReportByClientComponent implements OnInit,AfterViewInit {
  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 16;
  }
  public toolbar: string[];

  

  //variables of range date
  public date: Object = new Date();
  fecha: Date[];
  fechaActual:String=new Date().toLocaleDateString();
  data:any[];
  clientId:number;

  clients: Client[];
  public clientWorkOrder: Object = { text: 'name', value: 'id' };
  public clientWatermark: string = 'Seleccione un cliente*';
  
  @ViewChild('grid') public grid: GridComponent;
  
  public pageSettings: Object;
  

  constructor(private workOrderService:WorkOrderService,private serviceClient: ClientService) { }


  ngOnInit() {
    this.toolbar =['Generar PDF'];
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');
    this.serviceClient.getAllClients().subscribe(data => {
      this.clients = data;
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
                  value: 'Reporte Ordenes de trabajo por cliente',
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
      
      fileName: "Reporte de ordenes de trabajo por cliente.pdf"
  };
}

  list() {
    var startDate=this.fecha[0].toISOString().substring(0,10);
    var endDate=this.fecha[1].toISOString().substring(0,10);  
   this.workOrderService.getReportByClientAndDate(this.clientId,startDate, endDate).subscribe(data => {
      this.data = data;
    });
  }


}
