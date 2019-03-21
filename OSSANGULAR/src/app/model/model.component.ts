import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelService } from './model.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteEmitterService } from '../delete/delete.emitter.service';
import { DeleteComponent } from '../delete/delete.component';
import { setCulture } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Model } from 'src/model/model.model';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  constructor(private modelService: ModelService,
    private modalService: BsModalService, private deleteService: DeleteEmitterService) { }

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  public data: Model[];
  public pageSettings: Object;
  modalRef: BsModalRef;
  @ViewChild('grid') public grid: GridComponent;

  modelId: number;
  principal: boolean = true;
  editSection: boolean = false;
  insertSection = false;
  modelDelete: Model;

  ngOnInit(): void {
    this.getAllModels();
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');

    this.deleteService.deleteModel$.subscribe(data => {
      this.acceptDelete();
    });
  }

  getAllModels() {
    this.modelService.getAllModels().subscribe((data: Model[]) => {
      this.data = data;
    });
  }

  edit(element: Model) {
    this.modelId = element.id;
    this.principal = false;
    this.editSection = true;
  }

  acceptDelete() {
    this.modelService.deleteModel(this.modelDelete.id).subscribe(data => {
      this.getAllModels();
    })
  }

  insert() {
    this.principal = false;
    this.insertSection = true;
  }

  openModal(model: Model) {
    this.modelDelete = model;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar el Modelo',
        data: 'el modelo con el nombre: ' + model.name,
        type: 'model'
      }
    });
  }
}
