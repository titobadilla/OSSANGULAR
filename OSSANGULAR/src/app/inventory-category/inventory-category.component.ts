import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryCategoryService } from './inventory-category.service';
import { setCulture } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { MeasurementUnit } from 'src/model/measurementunit.model';
import { InventoryCategory } from 'src/model/inventorycategory.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteEmitterService } from '../delete/delete.emitter.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-inventory-category',
  templateUrl: './inventory-category.component.html',
  styleUrls: ['./inventory-category.component.css']
})
export class InventoryCategoryComponent implements OnInit {

  constructor(private inventoryCategoryService: InventoryCategoryService,
    private modalService: BsModalService, private deleteService: DeleteEmitterService) { }

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  public data: InventoryCategory[];
  public pageSettings: Object;
  modalRef: BsModalRef;
  @ViewChild('grid') public grid: GridComponent;

  categoryId: number;
  principal: boolean = true;
  editSection: boolean = false;
  insertSection = false;
  inventoryCategoryDelete: InventoryCategory;

  ngOnInit(): void {
    this.getAllCategories();
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');

    this.deleteService.deleteInventoryCategory$.subscribe(data => {
      this.aceptDelete();
    });
  }

  getAllCategories() {
    this.inventoryCategoryService.getAllCategories().subscribe((data: MeasurementUnit[]) => {
      this.data = data;
    });
  }

  edit(element: InventoryCategory) {
    this.categoryId = element.id;
    this.principal = false;
    this.editSection = true;
  }

  aceptDelete() {
    this.inventoryCategoryService.deleteInventoryCategory(this.inventoryCategoryDelete.id).subscribe(data => {
      this.getAllCategories();
    })
  }

  insert() {
    this.principal = false;
    this.insertSection = true;
  }

  openModal(inventoryCategory: InventoryCategory) {
    this.inventoryCategoryDelete = inventoryCategory;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar la Categoría de Inventario',
        data: 'la categoría con el nombre: ' + inventoryCategory.name,
        type: 'inventoryCategory'
      }
    });
  }
}
