import { Component, OnInit } from '@angular/core';
import { Model } from 'src/model/model.model';
import { InventoryCategory } from 'src/model/inventorycategory.model';
import { MeasurementUnit } from 'src/model/measurementunit.model';
import { Material } from 'src/model/material.model';
import { ModelService } from 'src/app/model/model.service';
import { MeasurementUnitService } from 'src/app/measurement-unit/measurement-unit.service';
import { InventoryCategoryService } from 'src/app/inventory-category/inventory-category.service';
import { MaterialService } from '../material.service';
import { MaterialComponent } from '../material.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'insert-material',
  templateUrl: './insert-material.component.html',
  styleUrls: ['./insert-material.component.css']
})
export class InsertMaterialComponent implements OnInit {

  ngAfterViewInit(): void {
    this.getValues();
  }

  public modelID: number;
  public models: Model[] = new Array();
  public modelMaterial: Object = { text: 'name', value: 'id' };
  public modelWatermark: string = 'Seleccione un modelo*';

  public categoryID: number;
  public categories: InventoryCategory[] = new Array();
  public categoryMaterial: Object = { text: 'name', value: 'id' };
  public categoryWatermark: string = 'Seleccione una categoría*';

  public measurementUnitID: number;
  public measurementsUnits: MeasurementUnit[] = new Array();
  public measurementUnitMaterial: Object = { text: 'name', value: 'id' };
  public measurementUnitWatermark: string = 'Seleccione una unidad de medida*';

  reactForm: FormGroup;
  material: Material = new Material();

  constructor(private modelService: ModelService,
    private measurementUnitService: MeasurementUnitService,
    private categoryService: InventoryCategoryService,
    private materialService: MaterialService,
    private parent: MaterialComponent) {

    this.createReactiveForm();
    this.associateValues();
  }
  ngOnInit() {
    this.initEventSubmit();
  }

  associateValues() {
    this.material.name = this.name.value;
    this.material.description = this.description.value;
    this.material.quantity = 0;
    this.material.model.id = this.model.value;
    this.material.inventoryCategory.id = this.category.value;
    this.material.measurementUnit.id = this.measurementUnit.value;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
      'description': new FormControl('', [FormValidators.required]),
      'model': new FormControl('', [this.valueRequired]),
      'category': new FormControl('', [this.valueRequired]),
      'measurementUnit': new FormControl('', [this.valueRequired]),

    });
  }

  get name() { return this.reactForm.get('name'); }
  get description() { return this.reactForm.get('description'); }
  get model() { return this.reactForm.get('model'); }
  get category() { return this.reactForm.get('category'); }
  get measurementUnit() { return this.reactForm.get('measurementUnit'); }

  initEventSubmit() {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          this.createMaterial();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });
  }

  createMaterial() {
    this.materialService.insertMaterial(this.material).subscribe(data => {
      this.returnView();
    })
  }

  getValues() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
      this.measurementUnitService.getAllMeasurementUnit().subscribe(data => {
        this.measurementsUnits = data;
        this.modelService.getAllModels().subscribe(data => {
          this.models = data;
        })
      })
    })
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

  returnView() {
    this.parent.getAllMaterials();
    this.parent.insertSection = false;
    this.parent.principal = true;
  }
}
