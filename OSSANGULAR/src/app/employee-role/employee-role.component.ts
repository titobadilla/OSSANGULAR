import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EmployeeRoleService } from './employee-role.service';
import { EmployeeRole } from 'src/model/employeerole.model';
import { setCulture } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteComponent } from '../delete/delete.component';
import { DeleteEmitterService } from '../delete/delete.emitter.service';

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
  @ViewChild('grid') public grid: GridComponent;
  modalRef: BsModalRef;

  constructor(private serviceRole: EmployeeRoleService,
    private modalService: BsModalService, private deleteService: DeleteEmitterService) {
  }

  roleid: number;
  principal: boolean = true;
  editSection: boolean = false;
  insertSection = false;
  rolDelete: EmployeeRole;

  ngOnInit(): void {
    this.getAllRoles();
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');
    this.deleteService.deleteEmployeeRole$.subscribe(data => {
      this.aceptDelete();
    });
  }


  getAllRoles() {
    this.serviceRole.getAllRoles().subscribe((data: EmployeeRole[]) => {
      this.grid.pageSettings.pageSize = 5;
      this.data = data;
    });
  }

  edit(element: EmployeeRole) {
    this.roleid = element.id;
    this.principal = false;
    this.editSection = true;
  }

  openModal(employeeRole: EmployeeRole) {
    this.rolDelete = employeeRole;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar Rol de Empleado',
        data: 'el rol con el nombre: ' + this.rolDelete.name,
        type: 'role'
      }
    });
  }

  aceptDelete() {
    this.serviceRole.deleteEmployeeRole(this.rolDelete.id).subscribe(data => {
      this.getAllRoles();
    });
  }

  insert() {
    this.principal = false;
    this.insertSection = true;
  }
}
