import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Employee } from 'src/model/employee.model';
import { EmployeeRoleService } from 'src/app/employee-role/employee-role.service';

@Component({
  selector: 'app-insert-employee',
  templateUrl: './insert-employee.component.html',
  styleUrls: ['./insert-employee.component.css']
})
export class InsertEmployeeComponent implements OnInit {

  public autoreactiveskillset: string[] = [
    'ASP.NET', 'ActionScript', 'Basic',
    'C++' , 'C#' , 'dBase' , 'Delphi' ,
    'ESPOL' , 'F#' , 'FoxPro' , 'Java',
    'J#' , 'Lisp' , 'Logo' , 'PHP'
];
public autoreactiveplaceholder: String = 'Seleccione un rol';

reactForm: FormGroup;
employee:Employee=new Employee();

  constructor(private router: Router,private employeeService:EmployeeService,private employeeRoleService:EmployeeRoleService) { 
  this.createReactiveForm();
  }


  createReactiveForm(){
    this.reactForm = new FormGroup({
      'id': new FormControl('', [FormValidators.required]),
      'name': new FormControl('', [FormValidators.required]),
      'lastName': new FormControl('', [FormValidators.required]),
      'position': new FormControl('', [FormValidators.required]),
      'role': new FormControl('', [FormValidators.required]),
      'username': new FormControl('', [FormValidators.required]),
      'password': new FormControl('', [FormValidators.required])

    });
  }


  ngOnInit() {
    this.initEventSubmit();
  }

  initEventSubmit(){
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          this.saveEmployee();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });

  }

  get id() { return this.reactForm.get('id'); }
  get name() { return this.reactForm.get('name'); }
  get lastName() { return this.reactForm.get('lastName'); }
  get position() { return this.reactForm.get('position'); }
  get role() { return this.reactForm.get('role'); }
  get username() { return this.reactForm.get('username'); }
  get password() { return this.reactForm.get('password'); }

  saveEmployee(){
    alert('save');
  }

}
