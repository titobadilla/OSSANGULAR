import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { EmployeeRoleService } from './employee-role.service';
import { EmployeeRole } from 'src/model/employeerole.model';
import { UpdateEmployeeRoleComponent } from './update-employee-role/update-employee-role.component';
import {setCulture } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';



@Component({
  selector: 'employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.css']
})
export class EmployeeRoleComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  public data: EmployeeRole[];
  public pageSettings: Object;
  @ViewChild('updateEmployeeRole') childOne: UpdateEmployeeRoleComponent;
  @ViewChild('grid') public grid: GridComponent;

  constructor(private serviceRole: EmployeeRoleService) {
  }

  roles: EmployeeRole[];
  roleid: number;
  principal: boolean = true;
  editSection: boolean = false;
  modalDelete = false;
  insertSection = false;
  rolDelete: EmployeeRole;

  ngOnInit(): void {
    this.getAllRoles();
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');
  }


  getAllRoles() {
    this.serviceRole.getAllRoles().subscribe((data: EmployeeRole[]) => {
      this.data = data;
    });
  }

  edit(element: EmployeeRole) {
    this.roleid = element.id;
    this.principal = false;
    this.editSection = true;
  }

  delete(rol: EmployeeRole) {
    this.rolDelete = rol;
    this.modalDelete = true;
  }

  hideModal() {
    this.rolDelete = new EmployeeRole();
    this.modalDelete = false;
  }

  aceptDelete() {
    this.serviceRole.deleteEmployeeRole(this.rolDelete.id).subscribe(data => {
      this.getAllRoles();
    });
    this.modalDelete = false;
  }

  insert() {
    this.principal = false;
    this.insertSection = true;
  }
}
