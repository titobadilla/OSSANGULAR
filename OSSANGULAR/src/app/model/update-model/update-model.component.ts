import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Model } from 'src/model/model.model';
import { ModelService } from '../model.service';
import { ModelComponent } from '../model.component';
import { Brand } from 'src/model/brand.model';
import { BrandService } from 'src/app/brand/brand.service';

@Component({
  selector: 'update-model',
  templateUrl: './update-model.component.html',
  styleUrls: ['./update-model.component.css']
})
export class UpdateModelComponent implements OnInit {

  ngAfterViewInit(): void {
    this.getBrands();
  }

  @Input() modelId: number;

  reactForm: FormGroup;
  model: Model = new Model();
  brandId: number;

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
          this.editModel();
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

  getBrands() {
    this.brandService.getAllBrands().subscribe(data => {
      this.brands = data;
      this.modelService.getByIdModel(this.modelId).subscribe(data => {
        this.model = data;
        this.setBrandInDropdown();
      })
    })
  }

  private editModel() {
    this.modelService.updateModel(this.model).subscribe(
      data => {
        this.returnView();
      }
    );

  }

  returnView() {
    this.parent.getAllModels();
    this.parent.editSection = false;
    this.parent.principal = true;
  }

  onChangeDdl(value: any) {
    if (value.itemData != undefined) {
      this.model.brand = this.findBrandById(value.itemData.id);
    }
  }

  findBrandById(id: number): any {
    let elementReturn;
    this.brands.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  setBrandInDropdown() {
    this.brand.setValue(this.model.brand.name);
    this.brand.setValidators(this.valueRequired);
    this.brandId = this.model.brand.id;
  }

}
