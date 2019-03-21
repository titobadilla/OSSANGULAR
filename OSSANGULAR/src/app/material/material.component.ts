import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteEmitterService } from '../delete/delete.emitter.service';
import { DeleteComponent } from '../delete/delete.component';
import { setCulture } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { MaterialService } from './material.service';
import { Material } from 'src/model/material.model';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  constructor(private materialService: MaterialService,
    private modalService: BsModalService, private deleteService: DeleteEmitterService) { }

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  public data: Material[];
  public pageSettings: Object;
  modalRef: BsModalRef;
  @ViewChild('grid') public grid: GridComponent;

  materialId: number;
  principal: boolean = true;
  editSection: boolean = false;
  insertSection = false;
  materialDelete: Material;

  ngOnInit(): void {
    this.getAllMaterials();
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');

    this.deleteService.deleteMaterial$.subscribe(data => {
      this.acceptDelete();
    });
  }

  getAllMaterials() {
    this.materialService.getAllMaterial().subscribe((data: Material[]) => {
      this.data = data;
    });
  }

  edit(element: Material) {
    this.materialId = element.id;
    this.principal = false;
    this.editSection = true;
  }

  acceptDelete() {
    this.materialService.deleteMaterial(this.materialDelete.id).subscribe(data => {
      this.getAllMaterials();
    })
  }

  insert() {
    this.principal = false;
    this.insertSection = true;
  }

  openModal(material:Material) {
    this.materialDelete = material;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar el Material',
        data: 'el material con el nombre: ' + material.name,
        type: 'material'
      }
    });
  }
}
