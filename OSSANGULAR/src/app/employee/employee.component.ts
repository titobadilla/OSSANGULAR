import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { Employee } from 'src/model/employee.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
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

  displayedColumns: string[] = ['id', 'name','lastName','position','roleName','telephoneMovil','telephoneHome','username', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Employee>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('updateEmployee') childOne: UpdateEmployeeComponent;

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
   this.getAllEmployees();
  }

  getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe((data: Employee[]) => {
      this.dataSource = new MatTableDataSource<Employee>(data);
      this.dataSource.paginator = this.paginator;
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