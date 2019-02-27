import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { MeasurementUnit } from 'src/model/measurementunit.model';
import { MeasurementUnitService } from '../measurement-unit.service';

@Component({
  selector: 'insert-measurement-unit',
  templateUrl: './insert-measurement-unit.component.html',
  styleUrls: ['./insert-measurement-unit.component.css']
})
export class InsertMeasurementUnitComponent implements OnInit {

  reactForm: FormGroup;
  measurementUnit: MeasurementUnit = new MeasurementUnit();

  constructor(private measurementUnitService: MeasurementUnitService) {
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
          this.reactForm.reset();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });
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

  private createMeasurementUnit() {
    this.measurementUnitService.insertMeasurementUnit(this.measurementUnit).subscribe();
  }
}
