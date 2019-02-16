import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Employee } from 'src/model/employee.model';
import { EmployeeRoleService } from 'src/app/employee-role/employee-role.service';
import { TelephoneEmployee } from 'src/model/telephoneemployee.model';
import { EmployeeRole } from 'src/model/employeerole.model';
import { FormBuilder } from '@angular/forms'
import { fbind } from 'q';

@Component({
  selector: 'update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  @Input() employeeId: String;
  
  public data: EmployeeRole[]=new Array();

  public fields: Object = { text: 'name', value: 'id' };
  public watermark: string = 'Seleccione un rol*';
  viewTelephones:boolean=false;

reactForm: FormGroup;
employee:Employee=new Employee();

  constructor(private router: Router,private employeeService:EmployeeService,private employeeRoleService:EmployeeRoleService,
    private fb: FormBuilder) {

  this.createReactiveForm();
  

  }

  getEmployeeRoles(){
    this.employeeRoleService.getAllRoles().subscribe(data=>{
      this.data=data
    });
  }

  loadEmployee(){
    this.employeeService.getByIdEmployee(this.employeeId).subscribe(
      data => {
        this.employee = data;
        this.loadEmployeeInReactiveFormWithValidation();
      }
    );
  }

 
  createReactiveForm(){

    this.reactForm = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl(),
      'lastName': new FormControl(),
      'position': new FormControl(),
      'role': new FormControl(),
      'username': new FormControl(),
      'password': new FormControl(),
      'mobile': new FormControl(),
      'home': new FormControl()

    });
  }

  loadEmployeeInReactiveFormWithValidation(){
    this.id.setValue(this.employee.id);
    this.id.setValidators(FormValidators.required)

    this.name.setValue(this.employee.name);
    this.name.setValidators(FormValidators.required);

    this.lastName.setValue(this.employee.lastName);
    this.lastName.setValidators(FormValidators.required);

    this.position.setValue(this.employee.position);
    this.position.setValidators(FormValidators.required);

    this.role.setValue(this.employee.role.name);
    this.role.setValidators(this.roleRequired);

    this.username.setValue(this.employee.username);
    this.username.setValidators(FormValidators.required);

    this.password.setValue(this.employee.password);
    this.password.setValidators(FormValidators.required);

    this.mobile.setValue(this.employee.telephones[0]!=undefined?this.employee.telephones[0].number:"");
    this.mobile.setValidators([FormValidators.required,this.phoneLength]);

    this.home.setValue(this.employee.telephones[1]!=undefined?this.employee.telephones[1].number:"");
    this.home.setValidators([this.phoneLength]);
  }

  
  phoneLength(control: FormControl) {
   
    let value = control.value; 
    if(value!=null){
    if (value.length<8 && value.length>=1|| value.length>8) {  
        return {
          phoneError: {
            parsed: value
          }
        }
   
    }}
    return null;
  }

  roleRequired(control: FormControl) {
  
    let value = control.value;
    if((value===null || value==="" || value===undefined)){
        return {
          errorD: {
            parsed: value
          }
        }    
  }
    return null;
  }



  ngOnInit() {
    this.getEmployeeRoles();
    this.loadEmployee();
    this.initEventSubmit();
  }

  initEventSubmit(){
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          this.editEmployeeRole();
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
  get mobile() { return this.reactForm.get('mobile'); }
  get home() { return this.reactForm.get('home'); }


   public editEmployeeRole() {

    /*if(this.employee.telephones[1]===undefined && this.home.value!=""){



    }*/
     
     /*if(!(this.mobile.value===this.employee.telephones[0].number)){
        this.employee.telephones[0].number=this.mobile.value;
     }*/

     

   /* if(this.home.value!=undefined || this.home.value!=null || this.home.value!=""){
        
     }else{

     } */

     
  
   
    //this.employeeService.updateEmployee(this.employee).subscribe();

  }

  viewTelephonesHtml(){
    this.viewTelephones=true;
  }

}
