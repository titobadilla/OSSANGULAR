import { Component, OnInit } from '@angular/core';
import { EmployeeRoleService } from './employee-role.service';
import { EmployeeRole } from 'src/model/employeerole.model';


@Component({
  selector: 'app-employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.css']
})
export class EmployeeRoleComponent implements OnInit {
 
  constructor(private serviceRole: EmployeeRoleService){}

  roles: EmployeeRole[] = new Array();

  ngOnInit(): void {

    this.serviceRole.getAllRoles().subscribe(data => {
      this.roles= data;
      console.log(this.roles[1].name)
    });
  }



}
