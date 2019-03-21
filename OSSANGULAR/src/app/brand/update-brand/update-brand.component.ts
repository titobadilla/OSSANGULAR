import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Brand } from 'src/model/brand.model';
import { BrandService } from '../brand.service';
import { BrandComponent } from '../brand.component';
@Component({
  selector: 'update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent implements OnInit {

  @Input() brandId: number;

  reactForm: FormGroup;
  brand: Brand = new Brand();

  constructor(private brandService: BrandService, private parent: BrandComponent) {
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
          this.editBrand();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });

    this.brandService.getByIdBrand(this.brandId).subscribe(data => {
      this.brand = data;
    })
  }

  associateValues() {
    this.brand.name = this.name.value;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
    });

  }

  get name() { return this.reactForm.get('name'); }

  private editBrand() {
    this.brandService.updateBrand(this.brand).subscribe(
      data => {
        this.returnView();
      }
    );

  }

  returnView() {
    this.parent.getAllBrands();
    this.parent.editSection = false;
    this.parent.principal = true;
  }

}
