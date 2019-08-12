import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { setCulture } from '@syncfusion/ej2-base';
import { KitWorkOrderService } from '../kit-work-order.service';
import { SuppliesMaterial } from 'src/model/suppliesMaterial.model';
import { SuppliesDevice } from 'src/model/suppliesDevice.model';
import { SuppliesTool } from 'src/model/suppliesTool.model';
import { KitWorkOrderComponent } from '../kit-work-order.component';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'see-more-kit',
  templateUrl: './see-more-kit.component.html',
  styleUrls: ['./see-more-kit.component.css']
})
export class SeeMoreKitComponent implements OnInit,AfterViewInit {

  @Input() kitId: number;
  public pageSettings: Object;
  
  @ViewChild('grid') public grid: GridComponent;

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;

    this.kitWorkOrderService.getByIdKitWorkOrder(this.kitId).subscribe(data => {
      this.materialList = data.listSuppliesMaterials;
      this.deviceList = data.listSuppliesDevices;
      this.toolList = data.listSuppliesTools;
    });
  }

  public materialList: SuppliesMaterial[] = new Array;
  public deviceList: SuppliesDevice[] = new Array;
  public toolList: SuppliesTool[] = new Array;

  constructor(private kitWorkOrderService: KitWorkOrderService, private parent: KitWorkOrderComponent) {
  }

  ngOnInit() {
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');

  }

  returnView() {
    this.parent.getAllKits();
    this.parent.insertSection = false;
    this.parent.principal = true;
  }

}
