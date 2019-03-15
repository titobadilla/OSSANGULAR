import { Component, OnInit, Input } from '@angular/core';
import { Material } from 'src/model/material.model';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { ModelService } from 'src/app/model/model.service';
import { MeasurementUnitService } from 'src/app/measurement-unit/measurement-unit.service';
import { InventoryCategoryService } from 'src/app/inventory-category/inventory-category.service';
import { Model } from 'src/model/model.model';
import { InventoryCategory } from 'src/model/inventorycategory.model';
import { MeasurementUnit } from 'src/model/measurementunit.model';
import { MaterialService } from '../material.service';
import { MaterialComponent } from '../material.component';

@Component({
  selector: 'update-material',
  templateUrl: './update-material.component.html',
  styleUrls: ['./update-material.component.css']
})
export class UpdateMaterialComponent implements OnInit {
  
  @Input() materialId: number;

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
  }
  ngOnInit() {
    this.initEventSubmit();
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
      'description': new FormControl('', [FormValidators.required]),
      'quantity': new FormControl('', [FormValidators.required]),
      'model': new FormControl('', [this.valueRequired]),
      'category': new FormControl('', [this.valueRequired]),
      'measurementUnit': new FormControl('', [this.valueRequired]),

    });
  }

  get name() { return this.reactForm.get('name'); }
  get description() { return this.reactForm.get('description'); }
  get quantity() { return this.reactForm.get('quantity'); }
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
          this.updateMaterial();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });
  }

  onChangeDdl(value: any) {

    if (value.itemData != undefined) {
      if (value.element.id === 'models') {
        this.material.model = this.findModelById(value.itemData.id);
      }
      if (value.element.id === 'categories') {
        this.material.inventoryCategory = this.findInventoryCategoryById(value.itemData.id);
      }
      if (value.element.id === 'measurementsUnits') {
        this.material.measurementUnit = this.findMeasurementUnitById(value.itemData.id);
      }
    }
  }

  findModelById(id: number): any {
    let elementReturn;
    this.models.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  findInventoryCategoryById(id: number): any {
    let elementReturn;
    this.categories.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  findMeasurementUnitById(id: number): any {
    let elementReturn;
    this.measurementsUnits.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  getMaterial() {
    this.materialService.getByIdMaterial(this.materialId).subscribe(data => {
      this.material = data;
      this.setValuesInDropdown();
    })
  }

  getValues() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
      this.measurementUnitService.getAllMeasurementUnit().subscribe(data => {
        this.measurementsUnits = data;
        this.modelService.getAllModels().subscribe(data => {
          this.models = data;
          this.getMaterial();
        })
      })
    })
  }

  public updateMaterial() {
    this.materialService.updateMaterial(this.material).subscribe(data => {
      this.returnView();
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

  setValuesInDropdown() {

    this.name.setValue(this.material.name);
    this.name.setValidators(FormValidators.required);

    this.description.setValue(this.material.description);
    this.description.setValidators(FormValidators.required);

    this.quantity.setValue(this.material.quantity);
    this.quantity.setValidators(FormValidators.required);
    this.quantity.disable();

    this.model.setValue(this.material.model.name);
    this.model.setValidators(this.valueRequired);
    this.modelID = this.material.model.id;

    this.category.setValue(this.material.inventoryCategory.name);
    this.category.setValidators(this.valueRequired);
    this.categoryID = this.material.inventoryCategory.id;

    this.measurementUnit.setValue(this.material.measurementUnit.name);
    this.measurementUnit.setValidators(this.valueRequired)
    this.measurementUnitID = this.material.measurementUnit.id;

  }

  returnView() {
    this.parent.getAllMaterials();
    this.parent.editSection = false;
    this.parent.principal = true;
  }
}
