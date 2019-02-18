import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EmployeeService } from './employee.service';

import { Employee } from 'src/model/employee.model';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { setCulture, removeClass, addClass } from '@syncfusion/ej2-base';


@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit,AfterViewInit {

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize=5;
  }


  public employees: Employee[];
  employeeId: String;
  public pageSettings: Object;

  @ViewChild('grid') public grid: GridComponent;
  public flag: boolean = false;

  
  principalSection: boolean = true;
  employeesSection: boolean = false;
  modalDelete = false;
  employeeDelete:Employee;
  public dataBound(): void {
    this.flag = true;
}

  constructor(private employeeService: EmployeeService) {

  }
  

  ngOnInit(): void {
   this.getAllEmployees();
   this.pageSettings = {pageCount: 3 };    
    setCulture('es-CR');   
  }

  getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees=data
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

     
     public onClicked(e: MouseEvent): void {
      if (!this.flag) { return; }

      let element: HTMLElement = <HTMLInputElement>e.target;


      if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
          return;
      }

      element = <HTMLElement>(element.tagName === 'BUTTON' ? element.firstElementChild : element);
      this.flag = false;
      let hidden: boolean = element.classList.contains('e-ghidden');
      let classFn: Function = hidden ? removeClass : addClass;
      classFn([element], 'e-ghidden');


      if (hidden) {
          this.grid.showColumns(element.innerHTML);
      } else {
          this.grid.hideColumns(element.innerHTML);
      }
  }

}