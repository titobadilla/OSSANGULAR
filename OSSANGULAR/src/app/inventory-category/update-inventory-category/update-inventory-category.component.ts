import { Component, OnInit,Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { InventoryCategory } from 'src/model/inventorycategory.model';
import { InventoryCategoryService } from '../inventory-category.service';

@Component({
  selector: 'update-inventory-category',
  templateUrl: './update-inventory-category.component.html',
  styleUrls: ['./update-inventory-category.component.css']
})
export class UpdateInventoryCategoryComponent implements OnInit {

  @Input() categoryId: number;

  reactForm: FormGroup;
  category: InventoryCategory = new InventoryCategory();

  constructor(private categoryService: InventoryCategoryService) {
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

      this.categoryService.getByIdInventoryCategory(this.categoryId).subscribe(data=>{
        this.category=data;
      })
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

  private editInventoryCategory() {
    this.categoryService.updateInventoryCategory(this.category).subscribe();
  }

}
