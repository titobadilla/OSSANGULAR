import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Employee } from 'src/model/employee.model';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { setCulture, removeClass, addClass } from '@syncfusion/ej2-base';
import { DeleteComponent } from '../delete/delete.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DeleteEmitterService } from '../delete/delete.emitter.service';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  modalRef: BsModalRef;
  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  public employees: Employee[];
  employeeId: String;
  public pageSettings: Object;

  @ViewChild('grid') public grid: GridComponent;
  public flag: boolean = false;

  principalSection: boolean = true;
  insertSection: boolean = false;
  employeesSection: boolean = false;
  employeeDelete: Employee;

  public dataBound(): void {
    this.flag = true;
  }

  constructor(private employeeService: EmployeeService, 
              private modalService: BsModalService,private deleteService:DeleteEmitterService) {

  }

  ngOnInit(): void {
    this.getAllEmployees();
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');
    this.deleteService.deleteEmployee$.subscribe(data=>{
      this.aceptDelete();
    });
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees = data
    });
  }

  edit(element: Employee) {
    this.employeeId = element.id;
    this.principalSection = false;
    this.employeesSection = true;
  }


  insert() {
    this.principalSection = false;
    this.insertSection = true;
  }

  aceptDelete() {
    this.employeeService.deleteEmployee(this.employeeDelete.id).subscribe(data => {
      this.getAllEmployees();
    });
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

  openModal(employee: Employee) {
    this.employeeDelete = employee;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar Empleado',
        data: 'el empleado con el nombre: ' + this.employeeDelete.name + ' ' + this.employeeDelete.lastName,
        type: 'employee'
      }
    });
  }

}