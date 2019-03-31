import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from '../employee/employee.service';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { ChangePassword } from 'src/model/changePassword.model';
import { TokenStorage } from '../login/helper/token-storage';

@Component({
  selector: 'change-password-technical',
  templateUrl: './change-password-technical.component.html',
  styleUrls: ['./change-password-technical.component.css']
})
export class ChangePasswordTechnicalComponent implements OnInit {

  reactForm: FormGroup;
  pass:ChangePassword=new ChangePassword();

  constructor(private employeeService: EmployeeService,private token:TokenStorage) {
    this.createReactiveForm();
    this.associateValues();
   }

  ngOnInit() {
    this.initEventSubmit();
  }

  associateValues() {
    this.pass.passwordPrevious=this.passwordPrevious.value;
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
    this.pass.idEmployee=this.token.decode().idEmployee;
    this.employeeService.updatePasswordEmployee(this.pass).subscribe(data=>{
     console.log('Succesfully'); 
     this.reactForm.reset;
    },error=>{
      console.log(error);


    });

  }

  createReactiveForm() {
    this.reactForm = new FormGroup({     
      'passwordPrevious': new FormControl('', [FormValidators.required]),
      'passwordNew': new FormControl('', [FormValidators.required])      
    });
  }

  
  get passwordPrevious() { return this.reactForm.get('passwordPrevious'); }
  get passwordNew() { return this.reactForm.get('passwordNew'); }



}
