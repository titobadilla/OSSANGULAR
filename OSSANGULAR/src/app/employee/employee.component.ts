import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public autoreactiveskillset: string[] = [
    'ASP.NET', 'ActionScript', 'Basic',
    'C++' , 'C#' , 'dBase' , 'Delphi' ,
    'ESPOL' , 'F#' , 'FoxPro' , 'Java',
    'J#' , 'Lisp' , 'Logo' , 'PHP'
];
public autoreactiveplaceholder: String = 'Select book';

reactForm: FormGroup;

  constructor(private router: Router,private employeeService:EmployeeService) { 
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
  }

  get id() { return this.reactForm.get('id'); }
  get name() { return this.reactForm.get('name'); }
  get lastName() { return this.reactForm.get('lastName'); }
  get position() { return this.reactForm.get('position'); }
  get role() { return this.reactForm.get('role'); }
  get username() { return this.reactForm.get('username'); }
  get password() { return this.reactForm.get('password'); }

}
