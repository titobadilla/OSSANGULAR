import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Employee } from 'src/model/employee.model';
import { EmployeeRoleService } from 'src/app/employee-role/employee-role.service';
import { TelephoneEmployee } from 'src/model/telephoneemployee.model';
import { EmployeeRole } from 'src/model/employeerole.model';

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

reactForm: FormGroup;
employee:Employee;

  constructor(private router: Router,private employeeService:EmployeeService,private employeeRoleService:EmployeeRoleService) {

     this.employee=new Employee();
  this.createReactiveForm();
  this.associateValues();
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
      }
    );
  }

  

  associateValues(){
    this.employee.id=this.id.value;
    this.employee.lastName=this.lastName.value;
    this.employee.name=this.name.value;
    this.employee.password=this.password.value;
    this.employee.position=this.position.value;
    this.employee.role.id=this.role.value;
    this.employee.username=this.username.value;
    this.employee.telephones[0]=this.mobile.value;
    this.employee.telephones[1]=this.home.value;
  }

   createReactiveForm(){
    this.reactForm = new FormGroup({
      'id': new FormControl('', [FormValidators.required]),
      'name': new FormControl('', [FormValidators.required]),
      'lastName': new FormControl('', [FormValidators.required]),
      'position': new FormControl('', [FormValidators.required]),
      'role': new FormControl('', [this.roleRequired]),
      'username': new FormControl('', [FormValidators.required]),
      'password': new FormControl('', [FormValidators.required]),
      'mobile': new FormControl('', [FormValidators.required,this.phoneLength]),
      'home': new FormControl('', [this.phoneLength])

    });
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
    var telephone=new TelephoneEmployee();
    telephone.type="Celular";
    telephone.number=this.mobile.value;
    this.employee.telephones.push(telephone);
    
    if(this.home.value.length===8){
      var telephoneHome=new TelephoneEmployee();      
      telephoneHome.type="Casa";
      telephoneHome.number=this.home.value;
     this.employee.telephones.push(telephoneHome);

    }
    this.employeeService.updateEmployee(this.employee).subscribe();
  }

}
