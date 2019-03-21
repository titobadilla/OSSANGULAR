import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Tool } from 'src/model/tool.model';
import { ToolService } from '../tool.service';
import { InventoryCategory } from 'src/model/inventorycategory.model';
import { InventoryCategoryService } from 'src/app/inventory-category/inventory-category.service';
import { MeasurementUnit } from 'src/model/measurementunit.model';
import { MeasurementUnitService } from 'src/app/measurement-unit/measurement-unit.service';
import { ToolComponent } from '../tool.component';

@Component({
  selector: 'insert-tool',
  templateUrl: './insert-tool.component.html',
  styleUrls: ['./insert-tool.component.css']
})
export class InsertToolComponent implements OnInit {

  public categories: InventoryCategory[] = new Array();
  public categoryTool: Object = { text: 'name', value: 'id' };
  public categoryWatermark: string = 'Seleccione una categoría*';

  public measurementsUnits: MeasurementUnit[] = new Array();
  public measurementUnitTool: Object = { text: 'name', value: 'id' };
  public measurementUnitWatermark: string = 'Seleccione una unidad de medida*';

  reactForm: FormGroup;
  tool: Tool = new Tool();

  constructor(private toolService: ToolService,
    private categoryService: InventoryCategoryService,
    private measurementUnitService: MeasurementUnitService, private parent: ToolComponent) {
    this.createReactiveForm();
    this.associateValues();
  }

  ngOnInit() {
    this.getValues();
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          this.createTool();
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
    this.tool.name = this.name.value;
    this.tool.quantity = 0;
    this.tool.description = this.description.value;
    this.tool.inventoryCategory.id = this.category.value;
    this.tool.measurementUnit.id = this.measurementUnit.value;
  }

  getValues() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    })

    this.measurementUnitService.getAllMeasurementUnit().subscribe(data => {
      this.measurementsUnits = data;
    })
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
      'description': new FormControl('', [FormValidators.required]),
      'category': new FormControl('', [this.valueRequired]),
      'measurementUnit': new FormControl('', [this.valueRequired]),
    });

  }

  get name() { return this.reactForm.get('name'); }
  get description() { return this.reactForm.get('description'); }
  get category() { return this.reactForm.get('category'); }
  get measurementUnit() { return this.reactForm.get('measurementUnit'); }

  private createTool() {
    this.toolService.insertTool(this.tool).subscribe(data => {
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

  returnView() {
    this.parent.getAlltools();
    this.parent.insertSection = false;
    this.parent.principal = true;
  }
}
