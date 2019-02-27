import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryCategoryService } from './inventory-category.service';
import {setCulture } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { MeasurementUnit } from 'src/model/measurementunit.model';
import { InventoryCategory } from 'src/model/inventorycategory.model';
import { UpdateInventoryCategoryComponent } from './update-inventory-category/update-inventory-category.component';

@Component({
  selector: 'app-inventory-category',
  templateUrl: './inventory-category.component.html',
  styleUrls: ['./inventory-category.component.css']
})
export class InventoryCategoryComponent implements OnInit {

  constructor(private inventoryCategoryService:InventoryCategoryService) { }

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  public data: InventoryCategory[];
  public pageSettings: Object;
  @ViewChild('updateInventoryCategory') childOne: UpdateInventoryCategoryComponent;
  @ViewChild('grid') public grid: GridComponent;

  categoryId: number;
  principal: boolean = true;
  editSection: boolean = false;
  modalDelete = false;
  insertSection = false;
  inventoryCategoryDelete: InventoryCategory;

  ngOnInit(): void {
    this.getAllCategories();
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');
  }

  getAllCategories() {
    this.inventoryCategoryService.getAllCategories().subscribe((data:MeasurementUnit[])=>{
      this.data=data;
    });
  }

  edit(element: InventoryCategory) {
    this.categoryId = element.id;
    this.principal = false;
    this.editSection = true;
  }

  delete(category:InventoryCategory) {
    this.inventoryCategoryDelete = category;
    this.modalDelete = true;
  }

  hideModal() {
    this.inventoryCategoryDelete = new InventoryCategory();
    this.modalDelete = false;
  }

  aceptDelete() {
    this.inventoryCategoryService.deleteInventoryCategory(this.inventoryCategoryDelete.id).subscribe(data=>{
      this.getAllCategories();
    })
    this.modalDelete = false;
  }

  insert() {
    this.principal = false;
    this.insertSection = true;
  }
}
