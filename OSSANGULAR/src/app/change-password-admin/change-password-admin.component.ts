import { Component, OnInit, Input } from '@angular/core';
import { ChangePassword } from 'src/model/changePassword.model';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from '../employee/employee.service';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Employee } from 'src/model/employee.model';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'change-password-admin',
  templateUrl: './change-password-admin.component.html',
  styleUrls: ['./change-password-admin.component.css']
})
export class ChangePasswordAdminComponent implements OnInit {
  reactForm: FormGroup;
  pass:ChangePassword=new ChangePassword();

  @Input() employee:Employee;

  constructor(private employeeService: EmployeeService,private parent: EmployeeComponent) {
    this.createReactiveForm();
    this.associateValues();
   }

  ngOnInit() {
    this.initEventSubmit();
  }

  associateValues() {
    this.pass.passwordNew=this.passwordNew.value;
  }

  initEventSubmit() {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          this.changePassword();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });

  }

  changePassword(){
    this.pass.idEmployee=this.employee.id;
    this.employeeService.updatePasswordAdminEmployee(this.pass).subscribe(data=>{
     console.log('Succesfully'); 
     this.returnView();
    },error=>{
      console.log(error);

    });

  }

  
  returnView() {
    this.parent.getAllEmployees();
    this.parent.changePasswordSection = false;
    this.parent.principalSection = true;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({     
      'passwordNew': new FormControl('', [FormValidators.required])      
    });
  }


  get passwordNew() { return this.reactForm.get('passwordNew'); }



}
