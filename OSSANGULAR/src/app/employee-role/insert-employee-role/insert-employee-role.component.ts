import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { EmployeeRole } from 'src/model/employeerole.model';
import { EmployeeRoleService } from '../employee-role.service';

@Component({
  selector: 'app-insert-employee-role',
  templateUrl: './insert-employee-role.component.html',
  styleUrls: ['./insert-employee-role.component.css']
})
export class InsertEmployeeRoleComponent implements OnInit {

  reactForm: FormGroup;
  role: EmployeeRole = new EmployeeRole();

  constructor(private router: Router, private employeeRoleService: EmployeeRoleService) {
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

  get name() { return this.reactForm.get('name'); }
  get type() { return this.reactForm.get('type'); }

  private createEmployeeRole() {
    this.employeeRoleService.insertEmployeeRole(this.role)
      .subscribe(data => {
      });
  }
}
