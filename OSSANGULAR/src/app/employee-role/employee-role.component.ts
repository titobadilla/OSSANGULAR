import { Component, OnInit } from '@angular/core';
import { EmployeeRoleService } from './employee-role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.css']
})
export class EmployeeRoleComponent implements OnInit {

  constructor(private router: Router,private employeeRoleService:EmployeeRoleService) { }

  ngOnInit() {
  }

}
