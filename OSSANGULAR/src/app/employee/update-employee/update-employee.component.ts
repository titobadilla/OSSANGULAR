import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { EmployeeService } from '../employee.service';
import { Employee } from 'src/model/employee.model';
import { EmployeeRoleService } from 'src/app/employee-role/employee-role.service';
import { TelephoneEmployee } from 'src/model/telephoneemployee.model';
import { EmployeeRole } from 'src/model/employeerole.model';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { EmployeeComponent } from '../employee.component';

@Component({
  selector: 'update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  @Input() employeeId: String;

  @ViewChild('ddlRole')
  public ddlRole: DropDownListComponent;

  public data: EmployeeRole[] = new Array();
  public value: number;

  public fields: Object = { text: 'name', value: 'id' };
  public filterPlaceholder: string = 'Buscar';
  public watermark: string = 'Seleccione un rol*';
  viewTelephones: boolean = false;

  reactForm: FormGroup;
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService, private employeeRoleService: EmployeeRoleService,
    private parent: EmployeeComponent) {
    this.createReactiveForm();
  }

  getEmployeeRoles() {
    this.employeeRoleService.getAllRoles().subscribe(data => {
      this.data = data
      this.loadEmployee();

    });
  }

  loadEmployee() {
    this.employeeService.getByIdEmployee(this.employeeId).subscribe(
      data => {
        this.employee = data;
        this.loadEmployeeInReactiveFormWithValidation();
      }
    );
  }

  createReactiveForm() {

    this.reactForm = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl(),
      'lastName': new FormControl(),
      'position': new FormControl(),
      'role': new FormControl(),
      'username': new FormControl(),
      'mobile': new FormControl(),
      'home': new FormControl()
    });
  }

  loadEmployeeInReactiveFormWithValidation() {
    this.id.setValue(this.employee.id);
    this.id.setValidators(FormValidators.required);
    this.id.disable();

    this.name.setValue(this.employee.name);
    this.name.setValidators(FormValidators.required);

    this.lastName.setValue(this.employee.lastName);
    this.lastName.setValidators(FormValidators.required);

    this.position.setValue(this.employee.position);
    this.position.setValidators(FormValidators.required);

    this.role.setValue(this.employee.role.name);
    this.role.setValidators(this.roleRequired);
    this.value = this.employee.role.id;

    this.username.setValue(this.employee.username);
    this.username.setValidators(FormValidators.required);

    this.mobile.setValue(this.employee.telephones[0] != undefined ? this.employee.telephones[0].number : "");
    this.mobile.setValidators([FormValidators.required, this.phoneLength]);

    this.home.setValue(this.employee.telephones[1] != undefined ? this.employee.telephones[1].number : "");
    this.home.setValidators([this.phoneLength]);
  }

  onChangeDdl(value: any) {
    if (value.itemData != undefined) {
      this.employee.role = value.itemData;
    }
  }

  findRoleById(id: number): any {
    let elementReturn;
    this.data.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  phoneLength(control: FormControl) {
    let value = control.value;
    if (value != null) {
      if (value.length < 8 && value.length >= 1 || value.length > 8) {
        return {
          phoneError: {
            parsed: value
          }
        }

      }
    }
    return null;
  }

  roleRequired(control: FormControl) {

    let value = control.value;
    if ((value === null || value === "" || value === undefined)) {
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
    this.initEventSubmit();
  }

  initEventSubmit() {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          this.editEmployee();
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
  get mobile() { return this.reactForm.get('mobile'); }
  get home() { return this.reactForm.get('home'); }
  get formValid() { return this.reactForm.valid }


  public editEmployee() {

    if (this.employee.telephones[1] === undefined && this.home.value != "") {
      var telephoneHome = new TelephoneEmployee();
      telephoneHome.type = "Casa";
      telephoneHome.number = this.home.value;
      this.employee.telephones.push(telephoneHome);
    } else if (this.home.value === "") {
      this.employee.telephones[1].number = '';
    }

<<<<<<< HEAD
    if(this.employee.telephones[1]===undefined && this.home.value!=""){      
        var telephoneHome=new TelephoneEmployee();      
        telephoneHome.type="Casa";
        telephoneHome.number=this.home.value;
       this.employee.telephones.push(telephoneHome);  
    }else if(this.home.value===""&& this.employee.telephones[1]!=undefined){
      this.employee.telephones[1].number='';
    } 
    
    this.employeeService.updateEmployee(this.employee).subscribe(data=>{
=======
    this.employeeService.updateEmployee(this.employee).subscribe(data => {
>>>>>>> ecbd45880d51dc5c1b555a797206e931e1adc82a
      this.returnView();
    });

  }

  returnView() {
    this.parent.getAllEmployees();
    this.parent.employeesSection = false;
    this.parent.principalSection = true;
  }

  viewTelephonesHtml() {
    this.viewTelephones = true;
  }

}
