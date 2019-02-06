import { Component, OnInit } from '@angular/core';
import { EmployeeRoleService } from './employee-role.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule, AbstractControl } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { EmployeeRole } from 'src/model/employeerole.model';

@Component({
  selector: 'app-employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.css']
})
export class EmployeeRoleComponent implements OnInit {

  reactForm: FormGroup;
  role: EmployeeRole = new EmployeeRole();

  constructor(private router: Router, private employeeRoleService: EmployeeRoleService) {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
      'type': new FormControl('', [FormValidators.required]),
    });
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

  get name() { return this.reactForm.get('name'); }
  get type() { return this.reactForm.get('type'); }

  private createEmployeeRole() {
    this.employeeRoleService.insertEmployeeRole(this.role)
      .subscribe(data => {
      });
  }

}
