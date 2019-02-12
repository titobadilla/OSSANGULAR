import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from './employee.service';

import { Employee } from 'src/model/employee.model';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = new Array();
  employeeId: String;

  
  principalSection: boolean = true;
  employeesSection: boolean = false;
  modalDelete = false;
  employeeDelete:Employee;
  @ViewChild('updateEmployee') childOne: UpdateEmployeeComponent;

  constructor(private employeeService: EmployeeService) {

  }
  

  ngOnInit(): void {
   this.getAllEmployees();
  }

  getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe((data: Employee[]) => {

    });
  }

  edit(element: Employee) {
    this.employeeId = element.id;
    this.principalSection = false;
    this.employeesSection = true;
  }

  delete(employee:Employee) {
    this.employeeDelete=employee;
    this.modalDelete = true;
  }

  hideModal() {
    this.employeeDelete=new Employee();
    this.modalDelete = false;
  }

  aceptDelete(){
    this.employeeService.deleteEmployee(this.employeeDelete.id).subscribe(data=>{
    
        this.getAllEmployees();
     });
     this.modalDelete = false;
     }
}