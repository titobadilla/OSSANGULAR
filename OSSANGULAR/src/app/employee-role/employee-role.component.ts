import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeRoleService } from './employee-role.service';
import { EmployeeRole } from 'src/model/employeerole.model';
import { UpdateEmployeeRoleComponent } from './update-employee-role/update-employee-role.component';


@Component({
  selector: 'employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.css']
})
export class EmployeeRoleComponent implements OnInit {

  public data: EmployeeRole[] = new Array();
    public pageSettings: Object = { pageCount: 2 };
  @ViewChild('updateEmployeeRole') childOne: UpdateEmployeeRoleComponent;

  constructor(private serviceRole: EmployeeRoleService) {}

  roles: EmployeeRole[] = new Array();
  roleid: number;
  primario: boolean = true;
  secundario: boolean = false;
  modalDelete = false;
  rolDelete:EmployeeRole;

  ngOnInit(): void {
   this.getAllRoles();
  }

  getAllRoles(){
    this.serviceRole.getAllRoles().subscribe((data: EmployeeRole[]) => {
        this.data = data;
    });
  }

  edit(element: EmployeeRole) {
    this.roleid = element.id;
    this.primario = false;
    this.secundario = true;
  }

  delete(rol:EmployeeRole) {
    this.rolDelete=rol;
    this.modalDelete = true;
  }

  hideModal() {
    this.rolDelete=new EmployeeRole();
    this.modalDelete = false;
  }

  aceptDelete(){
    this.serviceRole.deleteEmployeeRole(this.rolDelete.id).subscribe(data=>{
    
        this.getAllRoles();
     });
     this.modalDelete = false;
     }
}
