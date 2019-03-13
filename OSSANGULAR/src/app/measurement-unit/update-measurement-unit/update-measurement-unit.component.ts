import { Component, OnInit,Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { MeasurementUnit } from 'src/model/measurementunit.model';
import { MeasurementUnitService } from '../measurement-unit.service';
import { MeasurementUnitComponent } from '../measurement-unit.component';

@Component({
  selector: 'update-measurement-unit',
  templateUrl: './update-measurement-unit.component.html',
  styleUrls: ['./update-measurement-unit.component.css']
})
export class UpdateMeasurementUnitComponent implements OnInit {

  @Input() measurementUnitId: number;

  reactForm: FormGroup;
  measurementUnit:MeasurementUnit = new MeasurementUnit();

  constructor(private measurementUnitService:MeasurementUnitService, private parent: MeasurementUnitComponent) {
    this.createReactiveForm();
    this.associateValues();
  }

  ngOnInit() {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          this.editMeasurementUnit();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });

      this.measurementUnitService.getByIdMeasurementUnit(this.measurementUnitId).subscribe(data=>{
        this.measurementUnit=data;
      })
  }

  associateValues() {
    this.measurementUnit.name = this.name.value;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
    });
  }

  get name() { return this.reactForm.get('name'); }

  private editMeasurementUnit() {
    this.measurementUnitService.updateMeasurementUnit(this.measurementUnit).subscribe(data=>{
      this.returnView();
    });
  }

  returnView() {
    this.parent.getAllMeasurementUnits();
    this.parent.editSection = false;
    this.parent.principal = true;
  }

}
