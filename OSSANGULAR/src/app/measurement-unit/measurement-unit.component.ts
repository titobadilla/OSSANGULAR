import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MeasurementUnitService } from './measurement-unit.service';
import { MeasurementUnit } from 'src/model/measurementunit.model';
import { UpdateMeasurementUnitComponent } from './update-measurement-unit/update-measurement-unit.component';
import {setCulture } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-measurement-unit',
  templateUrl: './measurement-unit.component.html',
  styleUrls: ['./measurement-unit.component.css']
})
export class MeasurementUnitComponent implements OnInit {

  constructor(private measurementUnitService:MeasurementUnitService) { }

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  public data: MeasurementUnit[];
  public pageSettings: Object;
  @ViewChild('updateMeasurementUnit') childOne: UpdateMeasurementUnitComponent;
  @ViewChild('grid') public grid: GridComponent;

  measurementUnitId: number;
  principal: boolean = true;
  editSection: boolean = false;
  modalDelete = false;
  insertSection = false;
  measurementUnitDelete: MeasurementUnit;

  ngOnInit(): void {
    this.getAllMeasurementUnits();
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');
  }


  getAllMeasurementUnits() {
    this.measurementUnitService.getAllMeasurementUnit().subscribe((data:MeasurementUnit[]) =>{
      this.data=data;
    })
  }

  edit(element: MeasurementUnit) {
    this.measurementUnitId = element.id;
    this.principal = false;
    this.editSection = true;
  }

  delete(measurementUnit: MeasurementUnit) {
    this.measurementUnitDelete = measurementUnit;
    this.modalDelete = true;
  }

  hideModal() {
    this.measurementUnitDelete = new MeasurementUnit();
    this.modalDelete = false;
  }

  aceptDelete() {
    this.measurementUnitService.deleteMeasurementUnit(this.measurementUnitDelete.id).subscribe(data => {
      this.getAllMeasurementUnits();
    });
    this.modalDelete = false;
  }

  insert() {
    this.principal = false;
    this.insertSection = true;
  }
}
