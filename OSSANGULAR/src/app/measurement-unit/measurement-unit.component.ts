import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MeasurementUnitService } from './measurement-unit.service';
import { MeasurementUnit } from 'src/model/measurementunit.model';
import { setCulture } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteEmitterService } from '../delete/delete.emitter.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'measurement-unit',
  templateUrl: './measurement-unit.component.html',
  styleUrls: ['./measurement-unit.component.css']
})
export class MeasurementUnitComponent implements OnInit {

  constructor(private measurementUnitService: MeasurementUnitService,
    private modalService: BsModalService, private deleteService: DeleteEmitterService) { }

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  public data: MeasurementUnit[];
  public pageSettings: Object;
  @ViewChild('grid') public grid: GridComponent;

  measurementUnitId: number;
  principal: boolean = true;
  editSection: boolean = false;
  insertSection = false;
  measurementUnitDelete: MeasurementUnit;
  modalRef: BsModalRef;

  ngOnInit(): void {
    this.getAllMeasurementUnits();
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');
    this.deleteService.deleteMeasurementUnit$.subscribe(data => {
      this.aceptDelete();
    });
  }


  getAllMeasurementUnits() {
    this.measurementUnitService.getAllMeasurementUnit().subscribe((data: MeasurementUnit[]) => {
      this.data = data;
    })
  }

  edit(element: MeasurementUnit) {
    this.measurementUnitId = element.id;
    this.principal = false;
    this.editSection = true;
  }

  aceptDelete() {
    this.measurementUnitService.deleteMeasurementUnit(this.measurementUnitDelete.id).subscribe(data => {
      this.getAllMeasurementUnits();
    });
  }

  insert() {
    this.principal = false;
    this.insertSection = true;
  }

  openModal(measurementUnit: MeasurementUnit) {
    this.measurementUnitDelete = measurementUnit;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar la Unidad de Medida',
        data: 'la unidad de medida con el nombre: ' + measurementUnit.name,
        type: 'measurementUnit'
      }
    });
  }
}
