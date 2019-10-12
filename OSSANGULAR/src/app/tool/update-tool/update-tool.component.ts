import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Tool } from 'src/model/tool.model';
import { ToolService } from '../tool.service';
import { InventoryCategory } from 'src/model/inventorycategory.model';
import { InventoryCategoryService } from 'src/app/inventory-category/inventory-category.service';
import { MeasurementUnitService } from 'src/app/measurement-unit/measurement-unit.service';
import { MeasurementUnit } from 'src/model/measurementunit.model';
import { ToolComponent } from '../tool.component';

@Component({
  selector: 'update-tool',
  templateUrl: './update-tool.component.html',
  styleUrls: ['./update-tool.component.css']
})
export class UpdateToolComponent implements OnInit {

  @Input() toolId: number;

  reactForm: FormGroup;
  tool: Tool = new Tool();

  inventoryCategory: number;
  inventoryCategories: InventoryCategory[] = new Array();
  public categoryTool: Object = { text: 'name', value: 'id' };
  public categoryWatermark: string = 'Seleccione una categoría*';

  unitMeasurement: number;
  measurementsUnits: MeasurementUnit[] = new Array();
  public measurementTool: Object = { text: 'name', value: 'id' };
  public measurementUnitWatermark: string = 'Seleccione una unidad de medida*';

  constructor(private toolService: ToolService,
    private categoryService: InventoryCategoryService,
    private measurementUnitService: MeasurementUnitService, private parent: ToolComponent) {
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
          this.editTool();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });
    this.getValues();

  }

  setValuesInDropdown() {
    this.category.setValue(this.tool.inventoryCategory.name);
    this.category.setValidators(this.valueRequired);
    this.inventoryCategory = this.tool.inventoryCategory.id;

    this.measurementUnit.setValue(this.tool.measurementUnit.name);
    this.measurementUnit.setValidators(this.valueRequired);
    this.unitMeasurement = this.tool.measurementUnit.id;

    this.quantity.setValue(this.tool.quantity);
    this.quantity.setValidators(FormValidators.required);
    this.quantity.disable();

  }

  associateValues() {
    this.tool.name = this.name.value;
    this.tool.quantity = this.quantity.value;
    this.tool.description = this.description.value;
    this.tool.inventoryCategory.id = this.category.value;
    this.tool.measurementUnit.id = this.measurementUnit.value;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
      'description': new FormControl('', [FormValidators.required]),
      'category': new FormControl('', [this.valueRequired]),
      'quantity': new FormControl('', []),
      'measurementUnit': new FormControl('', [this.valueRequired]),
    });

  }
  get name() { return this.reactForm.get('name'); }
  get description() { return this.reactForm.get('description'); }
  get category() { return this.reactForm.get('category'); }
  get quantity() { return this.reactForm.get('quantity'); }
  get measurementUnit() { return this.reactForm.get('measurementUnit'); }

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

  private editTool() {
    this.toolService.updateTool(this.tool).subscribe(data => {
      this.returnView();
    });
  }

  onChangeDdl(value: any) {
    if (value.itemData != undefined) {
      this.tool.inventoryCategory = this.findCategoryById(value.itemData.id);
    }

  }

  onChangeUnit(value: any) {
    if (value.itemData != undefined) {
      this.tool.measurementUnit = this.findMeasurementUnitById(value.itemData.id);
    }
  }

  findCategoryById(id: number): any {
    let elementReturn;
    this.inventoryCategories.forEach(element => {
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

  getValues() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.inventoryCategories = data;
    });
    this.measurementUnitService.getAllMeasurementUnit().subscribe(data => {
      this.measurementsUnits = data;
    });
    this.toolService.getByIdTool(this.toolId).subscribe(data => {
      this.tool = data;
      this.setValuesInDropdown();
    });
  }

  returnView() {
    this.parent.getAlltools();
    this.parent.editSection = false;
    this.parent.principal = true;
  }
}
