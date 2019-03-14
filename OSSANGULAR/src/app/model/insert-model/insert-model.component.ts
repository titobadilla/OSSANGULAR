import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Model } from 'src/model/model.model';
import { ModelService } from '../model.service';
import { ModelComponent } from '../model.component';
import { Brand } from 'src/model/brand.model';
import { BrandService } from 'src/app/brand/brand.service';

@Component({
  selector: 'insert-model',
  templateUrl: './insert-model.component.html',
  styleUrls: ['./insert-model.component.css']
})
export class InsertModelComponent implements OnInit {

  reactForm: FormGroup;
  model: Model = new Model();

  public brands: Brand[] = new Array();
  public brandModel: Object = { text: 'name', value: 'id' };
  public brandWatermark: string = 'Seleccione una marca*';

  constructor(private modelService: ModelService, private parent: ModelComponent, private brandService: BrandService) {
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
          this.createModel();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });

    this.brandService.getAllBrands().subscribe(data => {
      this.brands = data;
    })
  }

  associateValues() {
    this.model.name = this.name.value;
    this.model.brand.id = this.brand.value;

  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
      'brand': new FormControl('', [this.valueRequired])
    });

  }

  valueRequired(control: FormControl) {

    let value = control.value;
    if ((value === null || value === "" || value === undefined)) {
      return {
        errorD: {
          parsed: value
        }
      }
    }
    return null;
  }

  get name() { return this.reactForm.get('name'); }
  get brand() { return this.reactForm.get('brand'); }

  private createModel() {
    this.modelService.insertModel(this.model).subscribe(data => {
      this.returnView();
    });
  }

  returnView() {
    this.parent.getAllModels();
    this.parent.insertSection = false;
    this.parent.principal = true;
  }

}
