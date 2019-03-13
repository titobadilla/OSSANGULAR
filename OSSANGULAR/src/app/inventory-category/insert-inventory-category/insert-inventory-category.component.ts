import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { InventoryCategory } from 'src/model/inventorycategory.model';
import { InventoryCategoryService } from '../inventory-category.service';
import { InventoryCategoryComponent } from '../inventory-category.component';

@Component({
  selector: 'insert-inventory-category',
  templateUrl: './insert-inventory-category.component.html',
  styleUrls: ['./insert-inventory-category.component.css']
})
export class InsertInventoryCategoryComponent implements OnInit {

  reactForm: FormGroup;
  category: InventoryCategory = new InventoryCategory();

  constructor(private categoryService: InventoryCategoryService, private parent: InventoryCategoryComponent) {
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
          this.createInventoryCategory();
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
    this.category.name = this.name.value;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
    });

  }

  get name() { return this.reactForm.get('name'); }

  private createInventoryCategory() {
    this.categoryService.insertInventoryCategory(this.category).subscribe();
  }

  returnView() {
    this.parent.getAllCategories();
    this.parent.insertSection = false;
    this.parent.principal = true;
  }

}
