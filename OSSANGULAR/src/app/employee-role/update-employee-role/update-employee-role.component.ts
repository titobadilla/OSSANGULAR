import { Component, OnInit, Input, } from '@angular/core';
import { EmployeeRoleService } from '../employee-role.service';
import { EmployeeRole } from 'src/model/employeerole.model';
import { FormControl, FormGroup, Validators, FormsModule, AbstractControl } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'update-employee-role',
  templateUrl: './update-employee-role.component.html',
  styleUrls: ['./update-employee-role.component.css']
})
export class UpdateEmployeeRoleComponent implements OnInit {

  @Input() roleid: number;

  role: EmployeeRole = new EmployeeRole();
  reactForm: FormGroup = null;
  constructor(private serviceRole: EmployeeRoleService) {
  }

  associateValues() {
    this.role.name = this.name.value;
    this.role.type = this.type.value;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
      'type': new FormControl('', [FormValidators.required]),
    });
  }

  ngOnInit() {
    this.serviceRole.getByIdEmployeeRole(this.roleid).subscribe(
      data => {
        this.role = data;
      }
    );
   
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

      this.createReactiveForm();
      this.associateValues();

  }

  get name() { return this.reactForm.get('name'); }
  get type() { return this.reactForm.get('type'); }

  public editEmployeeRole() {
    this.serviceRole.updateEmployeeRole(this.role).subscribe();
  }

}
