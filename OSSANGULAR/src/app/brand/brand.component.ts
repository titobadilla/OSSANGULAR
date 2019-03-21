import { Component, OnInit, ViewChild } from '@angular/core';
import { BrandService } from './brand.service';
import { DeleteEmitterService } from '../delete/delete.emitter.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Brand } from 'src/model/brand.model';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { setCulture } from '@syncfusion/ej2-base';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  constructor(private brandService: BrandService,
    private modalService: BsModalService, private deleteService: DeleteEmitterService) { }

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  public data: Brand[];
  public pageSettings: Object;
  modalRef: BsModalRef;
  @ViewChild('grid') public grid: GridComponent;

  brandId: number;
  principal: boolean = true;
  editSection: boolean = false;
  insertSection = false;
  brandDelete: Brand;

  ngOnInit(): void {
    this.getAllBrands();
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');

    this.deleteService.deleteBrand$.subscribe(data => {
      this.acceptDelete();
    });
  }

  getAllBrands() {
    this.brandService.getAllBrands().subscribe((data: Brand[]) => {
      this.data = data;
    });
  }

  edit(element: Brand) {
    this.brandId = element.id;
    this.principal = false;
    this.editSection = true;
  }

  acceptDelete() {
    this.brandService.deleteBrand(this.brandDelete.id).subscribe(data => {
      this.getAllBrands();
    })
  }

  insert() {
    this.principal = false;
    this.insertSection = true;
  }

  openModal(brand: Brand) {
    this.brandDelete = brand;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar la Marca de Inventario',
        data: 'la marca con el nombre: ' + brand.name,
        type: 'brand'
      }
    });
  }
}
