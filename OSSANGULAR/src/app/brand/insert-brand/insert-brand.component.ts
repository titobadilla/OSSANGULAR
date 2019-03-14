import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Brand } from 'src/model/brand.model';
import { BrandService } from '../brand.service';
import { BrandComponent } from '../brand.component';

@Component({
  selector: 'insert-brand',
  templateUrl: './insert-brand.component.html',
  styleUrls: ['./insert-brand.component.css']
})
export class InsertBrandComponent implements OnInit {

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
          this.createBrand();
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
    this.brand.name = this.name.value;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
    });

  }

  get name() { return this.reactForm.get('name'); }

  private createBrand() {
    this.brandService.insertBrand(this.brand).subscribe(data=>{
      this.returnView();
    });
  }

  returnView() {
    this.parent.getAllBrands();
    this.parent.insertSection = false;
    this.parent.principal = true;
  }

}
